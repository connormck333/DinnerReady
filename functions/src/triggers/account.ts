import { onRequest, Request } from "firebase-functions/v2/https";
import { Response } from "express";
import { isGetReq, isPutReq } from "../utils/request_utils";
import { GENERAL_ERROR_CODE, GENERAL_ERROR_MESSAGE, INVALID_REQUEST_CODE, INVALID_REQUEST_MESSAGE, SUCCESS_CODE, SUCCESS_MESSAGE, UNAUTHORISED_CODE, UNAUTHORISED_MESSAGE } from "../utils/status_codes";
import { authenticateUserToken } from "../utils/authorisation";
import { DocumentReference, DocumentSnapshot } from "firebase-admin/firestore";
import { db } from "../utils/admin";
import { Family, QueryResponse, UserFamily } from "../types/interfaces";
import QueryStatus from "../types/query_status";
import { getFamilyMembers, updateUsersAdminStatus } from "../utils/db/families";
import { getUserData, isUserAdmin } from "../utils/db/account";

const getUserInfo = onRequest(async (req: Request, res: Response): Promise<void> => {

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

    // Get user data
    const userQueryResponse: QueryResponse = await getUserData(userEmail);
    if (userQueryResponse.status === QueryStatus.FAILURE) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }
    const userData = userQueryResponse.data;
    const familyId: string = userData.familyId;

    // Get family data
    const familyRef: DocumentReference = db.collection("families").doc(familyId);
    let familySnap: DocumentSnapshot;
    try {
        familySnap = await familyRef.get();
    } catch(error) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    // Get family members data
    const members: QueryResponse = await getFamilyMembers(familyId, userEmail);

    if (members.status === QueryStatus.FAILURE) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    const familyData: Family = {
        familyId: familyId,
        name: familySnap.data()?.name,
        members: members.data
    }

    const data: UserFamily = {
        firstName: userData.firstName,
        surname: userData.surname,
        email: userEmail,
        familyData: familyData
    }

    res.status(SUCCESS_CODE).send(JSON.stringify(data));
});

const setUserAsFamilyAdmin = onRequest(async (req: Request, res: Response): Promise<void> => {
    
    if (!isPutReq(req.method)) {
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

    // Update new user to admin
    const adminEmail: string = body.adminEmail;
    const success: boolean = await updateUsersAdminStatus(adminEmail, true);

    if (!success) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(SUCCESS_MESSAGE);
});

const removeAdminStatusFromFamilyMember = onRequest(async (req: Request, res: Response): Promise<void> => {

    if (!isPutReq(req.method)) {
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

    // Update new user to admin
    const adminEmail: string = body.adminEmail;
    const success: boolean = await updateUsersAdminStatus(adminEmail, false);

    if (!success) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(SUCCESS_MESSAGE);
});

export {
    getUserInfo,
    setUserAsFamilyAdmin,
    removeAdminStatusFromFamilyMember
}