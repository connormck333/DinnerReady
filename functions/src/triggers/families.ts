import { onRequest, Request } from "firebase-functions/v2/https";
import { Response } from "express";
import { isPostReq } from "../utils/request_utils";
import { GENERAL_ERROR_CODE, GENERAL_ERROR_MESSAGE, INVALID_REQUEST_CODE, INVALID_REQUEST_MESSAGE, SUCCESS_CODE, SUCCESS_MESSAGE, UNAUTHORISED_CODE, UNAUTHORISED_MESSAGE } from "../utils/status_codes";
import { authenticateUserToken } from "../utils/authorisation";
import { isUserAdmin } from "../utils/db/account";
import { QueryResponse } from "../types/interfaces";
import QueryStatus from "../types/query_status";
import { createFamilyJoinCode, doesJoinCodeExist, joinFamilyByJoinCode, leaveFamily } from "../utils/db/families";

const createJoinCode = onRequest(async (req: Request, res: Response) => {

    if (!isPostReq(req.method)) {
        res.status(INVALID_REQUEST_CODE).send(INVALID_REQUEST_MESSAGE);
        return;
    }

    let userEmail: string = req.body.email;
    if (!userEmail) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }
    userEmail = userEmail.toLowerCase();

    const token: string | undefined = req.headers.authorization;
    if (!(await authenticateUserToken(token, userEmail))) {
        res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);
        return;
    }

    const response: QueryResponse = await isUserAdmin(userEmail);
    if (response.status === QueryStatus.FAILURE || !response.data) {
        res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);
        return;
    }

    const codeResponse: QueryResponse = await createFamilyJoinCode(userEmail);
    if (codeResponse.status === QueryStatus.FAILURE) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(JSON.stringify({code: codeResponse.data}));
});

const joinFamilyUsingCode = onRequest(async (req: Request, res: Response) => {

    if (!isPostReq(req.method)) {
        res.status(INVALID_REQUEST_CODE).send(INVALID_REQUEST_MESSAGE);
        return;
    }

    const body: any = req.body;
    let userEmail: string = body.email;
    if (!userEmail) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }
    userEmail = userEmail.toLowerCase();

    const token: string | undefined = req.headers.authorization;
    if (!(await authenticateUserToken(token, userEmail))) {
        res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);
        return;
    }

    const response: boolean = await joinFamilyByJoinCode(userEmail, body.code);

    if (!response) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(SUCCESS_MESSAGE);
});

const joinNewFamilyUsingCode = onRequest(async (req: Request, res: Response) => {

    if (!isPostReq(req.method)) {
        res.status(INVALID_REQUEST_CODE).send(INVALID_REQUEST_MESSAGE);
        return;
    }

    const body: any = req.body;
    let userEmail: string = body.email;
    if (!userEmail) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }
    userEmail = userEmail.toLowerCase();

    const token: string | undefined = req.headers.authorization;
    if (!(await authenticateUserToken(token, userEmail))) {
        res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);
        return;
    }

    const code: string = body.code;
    if (!(await doesJoinCodeExist(code))) {
        console.log("1");
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    const leaveResponse: boolean = await leaveFamily(userEmail);
    if (!leaveResponse) {
        console.log("2");
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    const joinResponse: boolean = await joinFamilyByJoinCode(userEmail, code);
    if (!joinResponse) {
        console.log("3");
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(SUCCESS_MESSAGE);
});

export {
    createJoinCode,
    joinFamilyUsingCode,
    joinNewFamilyUsingCode
}