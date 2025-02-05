import { onRequest, Request } from "firebase-functions/v2/https";
import { Response } from "express";
import { isPostReq } from "../utils/request_utils";
import { authenticateUserToken } from "../utils/authorisation";
import { GENERAL_ERROR_CODE, GENERAL_ERROR_MESSAGE, INVALID_REQUEST_CODE, INVALID_REQUEST_MESSAGE,
    SUCCESS_CODE, SUCCESS_MESSAGE, UNAUTHORISED_CODE, UNAUTHORISED_MESSAGE } from "../utils/status_codes";
import { addUserToFamily, createNewFamily } from "../utils/db/families";
import { createNewUser } from "../utils/db/account";
import { QueryResponse } from "../types/interfaces";
import QueryStatus from "../types/query_status";

const createUser = onRequest(async (req: Request, res: Response) : Promise<void> => {

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

    const response: boolean = await createNewUser(userEmail, body.firstName, body.surname);
    if (!response) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(SUCCESS_MESSAGE);
});

const createFamilyAccount = onRequest(async (req: Request, res: Response) : Promise<void> => {

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

    const response: QueryResponse = await createNewFamily(userEmail, body.familyName);
    if (response.status === QueryStatus.FAILURE) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(JSON.stringify({familyId: response.data}));
});

const joinFamilyAccountAsAdmin = onRequest(async (req: Request, res: Response) : Promise<void> => {

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

    const familyId: string = body.familyId;
    const success = addUserToFamily(familyId, userEmail, true);

    if (!success) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(SUCCESS_MESSAGE);
});

const joinFamilyAccountAsMember = onRequest(async (req: Request, res: Response) : Promise<void> => {

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

    const familyId: string = body.familyId;
    const success = addUserToFamily(familyId, userEmail, false);

    if (!success) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(SUCCESS_MESSAGE);
});

export {
    createUser,
    createFamilyAccount,
    joinFamilyAccountAsAdmin,
    joinFamilyAccountAsMember
}