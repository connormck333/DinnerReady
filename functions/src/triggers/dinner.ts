import { onRequest, Request } from "firebase-functions/v2/https";
import { Response } from "express";
import { isGetReq, isPostReq } from "../utils/request_utils";
import { GENERAL_ERROR_CODE, GENERAL_ERROR_MESSAGE, INVALID_REQUEST_CODE, INVALID_REQUEST_MESSAGE, SUCCESS_CODE, SUCCESS_MESSAGE, UNAUTHORISED_CODE, UNAUTHORISED_MESSAGE } from "../utils/status_codes";
import { authenticateUserToken } from "../utils/authorisation";
import { getFamilyId, getUserData, isUserAdmin } from "../utils/db/account";
import { Attendee, Dinner, QueryResponse, QueryResponseExists, User } from "../types/interfaces";
import { createNewDinner, doesDinnerExist, getDinner, getUserAttendanceCalendar, setAnnouncedAtForDinner, setAttendanceForDinnerWithId, setAttendanceForDinnerWithoutId } from "../utils/db/dinner";
import QueryStatus from "../types/query_status";

const startDinner = onRequest(async (req: Request, res: Response): Promise<void> => {

    if (!isPostReq(req.method)) {
        res.status(INVALID_REQUEST_CODE).send(INVALID_REQUEST_MESSAGE);
        return;
    }

    const body: any = req.body;
    const token: string | undefined = req.headers.authorization;
    const userEmail: string = body.email.toLowerCase();
    if (!(await authenticateUserToken(token, userEmail))) {
        res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);
        return;
    }

    // Check user sending request is an admin
    if (!(await isUserAdmin(userEmail))) {
        res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);
        return;
    }

    const userDataResponse: QueryResponse = await getUserData(userEmail);
    const userData: User = userDataResponse.data;
    if (userDataResponse.status === QueryStatus.FAILURE || userData.familyId === undefined) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }
    
    const dinnerData: Dinner = {
        dinnerId: undefined,
        date: body.date,
        announcedAtTimestamp: Date.now(),
        description: body.description
    }

    const dinnerExistsResponse: QueryResponseExists = await doesDinnerExist(userData.familyId, body.date);
    if (dinnerExistsResponse.status == QueryStatus.FAILURE) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }
    const dinnerExists: boolean = dinnerExistsResponse.exists as boolean;

    let queryResponse: QueryResponse;
    if (dinnerExists) {
        queryResponse = await getDinner(userData.familyId, dinnerData.date);
        await setAnnouncedAtForDinner(userData.familyId, queryResponse.data.dinner.dinnerId, dinnerData.announcedAtTimestamp)
    } else {
        queryResponse = await createNewDinner(userData.familyId, dinnerData);
    }

    if (queryResponse.status === QueryStatus.FAILURE) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    // Send notifications

    res.status(SUCCESS_CODE).send(JSON.stringify(queryResponse.data));
});

const getDinnerDetails = onRequest(async (req: Request, res: Response): Promise<void> => {

    if (!isGetReq(req.method)) {
        res.status(INVALID_REQUEST_CODE).send(INVALID_REQUEST_MESSAGE);
        return;
    }

    const token: string | undefined = req.headers.authorization;
    let userEmail: string = req.query.email as string;
    userEmail = userEmail.toLowerCase();
    if (!(await authenticateUserToken(token, userEmail))) {
        res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);
        return;
    }

    const familyIdResponse: QueryResponse = await getFamilyId(userEmail);
    if (familyIdResponse.status === QueryStatus.FAILURE) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    const familyId: string = familyIdResponse.data;
    const dinnerDate: string = req.query.dinnerDate as string;

    const queryResponse: QueryResponse = await getDinner(familyId, dinnerDate);
    if (queryResponse.status === QueryStatus.FAILURE) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    const attendees: Attendee[] = queryResponse.data;
    
    res.status(SUCCESS_CODE).send(JSON.stringify(attendees));
});

const optInForDinner = onRequest(async (req: Request, res: Response): Promise<void> => {

    if (!isPostReq(req.method)) {
        res.status(INVALID_REQUEST_CODE).send(INVALID_REQUEST_MESSAGE);
        return;
    }

    const body: any = req.body;
    const token: string | undefined = req.headers.authorization;
    const userEmail: string = body.email.toLowerCase();
    if (!(await authenticateUserToken(token, userEmail))) {
        res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);
        return;
    }

    const success = await registerAttendanceForDinner(userEmail, body, true);
    if (!success) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(SUCCESS_MESSAGE);
});

const optOutForDinner = onRequest(async (req: Request, res: Response): Promise<void> => {

    if (!isPostReq(req.method)) {
        res.status(INVALID_REQUEST_CODE).send(INVALID_REQUEST_MESSAGE);
        return;
    }

    const body: any = req.body;
    const token: string = req.headers.authorization as string;
    const userEmail: string = body.email.toLowerCase();
    if (!(await authenticateUserToken(token, userEmail))) {
        res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);
        return;
    }

    const success = await registerAttendanceForDinner(userEmail, body, false);
    if (!success) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(SUCCESS_MESSAGE);
});

const getUserDinnerAttendances = onRequest(async (req: Request, res: Response): Promise<void> => {

    if (!isGetReq(req.method)) {
        res.status(INVALID_REQUEST_CODE).send(INVALID_REQUEST_MESSAGE);
        return;
    }

    const token: string = req.headers.authorization as string;
    const userEmail: string = req.query.email as string;
    if (!(await authenticateUserToken(token, userEmail))) {
        res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);
        return;
    }

    const userData: QueryResponseExists = await getUserData(userEmail);
    if (!userData.exists || userData.status === QueryStatus.FAILURE) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }
    
    const familyId: string = userData.data.familyId;
    const response: QueryResponse = await getUserAttendanceCalendar(userEmail, familyId);
    if (response.status === QueryStatus.FAILURE) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(JSON.stringify(response.data));
})

async function registerAttendanceForDinner(userEmail: string, body: any, attendingStatus: boolean): Promise<boolean> {
    const familyIdResponse: QueryResponse = await getFamilyId(userEmail);
    if (familyIdResponse.status === QueryStatus.FAILURE) return false;

    const familyId: string = familyIdResponse.data;
    let dinnerId: string | null = body?.dinnerId;
    const date: string = body?.date;

    // Check if dinnerId exists
    const response: QueryResponseExists = await doesDinnerExist(familyId, date);
    if (response.status == QueryStatus.FAILURE) {
        return false;
    }

    const dinnerExists: boolean = response.exists as boolean;
    if (dinnerExists && !dinnerId) {
        dinnerId = response.data;
    }

    let success: boolean;
    if (dinnerId === null || !dinnerExists) {
        success = await setAttendanceForDinnerWithoutId(userEmail, familyId, attendingStatus, date);
    } else {
        success = await setAttendanceForDinnerWithId(userEmail, familyId, dinnerId, attendingStatus);
    }
    
    return success;
}

export {
    startDinner,
    optInForDinner,
    optOutForDinner,
    getDinnerDetails,
    getUserDinnerAttendances
}