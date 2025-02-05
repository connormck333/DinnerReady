import { onRequest, Request } from "firebase-functions/v2/https";
import { Response } from "express";
import { isGetReq, isPostReq } from "../utils/request_utils";
import { GENERAL_ERROR_CODE, GENERAL_ERROR_MESSAGE, INVALID_REQUEST_CODE, INVALID_REQUEST_MESSAGE, SUCCESS_CODE, SUCCESS_MESSAGE, UNAUTHORISED_CODE, UNAUTHORISED_MESSAGE } from "../utils/status_codes";
import { authenticateUserToken } from "../utils/authorisation";
import { getFamilyId, getUserData, isUserAdmin } from "../utils/db/account";
import { Attendee, Dinner, QueryResponse, User } from "../types/interfaces";
import { createNewDinner, doesDinnerExist, getDinner, setAttendanceForDinnerWithId, setAttendanceForDinnerWithoutId } from "../utils/db/dinner";
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
        startsAtTimestamp: body.startsAtTimestamp,
        endsAtTimestamp: body.endsAtTimestamp,
        description: body.description
    }

    const dinnerExistsResponse: QueryResponse = await doesDinnerExist(userEmail, userData.familyId, body.date);
    if (dinnerExistsResponse.status == QueryStatus.FAILURE) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }
    const dinnerExists: boolean = dinnerExistsResponse.data.exists;

    let queryResponse: QueryResponse;
    if (dinnerExists) {
        queryResponse = await getDinner(userData.familyId, dinnerExistsResponse.data.dinnerId);
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

    const body: any = req.body;
    const token: string | undefined = req.headers.authorization;
    const userEmail: string = body.email.toLowerCase();
    if (!(await authenticateUserToken(token, userEmail))) {
        res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);
        return;
    }

    const familyIdResponse: QueryResponse = await getFamilyId(userEmail);
    if (familyIdResponse.status === QueryStatus.FAILURE) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    const familyId: string = familyIdResponse.data.familyId;
    const dinnerId: string = body.dinnerId;

    const queryResponse: QueryResponse = await getDinner(familyId, dinnerId);
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
    const token: string | undefined = req.headers.authorization;
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

async function registerAttendanceForDinner(userEmail: string, body: any, attendingStatus: boolean): Promise<boolean> {
    const familyIdResponse: QueryResponse = await getFamilyId(userEmail);
    if (familyIdResponse.status === QueryStatus.FAILURE) return false;

    const familyId: string = familyIdResponse.data.familyId;
    const dinnerId: string | null = body?.dinnerId;
    const date: string = body?.date;

    // Check if dinnerId exists
    const response: QueryResponse = await doesDinnerExist(userEmail, familyId, date);
    if (response.status == QueryStatus.FAILURE) {
        return false;
    }

    const dinnerExists: boolean = response.data.exists;

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
    getDinnerDetails
}