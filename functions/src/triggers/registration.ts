import { onRequest } from "firebase-functions/v2/https";
import { db } from "../utils/admin";
import { isPostReq } from "../utils/request_utils";
import { authenticateUserToken } from "../utils/authorisation";
import { CollectionReference } from "firebase-admin/firestore";
import { GENERAL_ERROR_CODE, GENERAL_ERROR_MESSAGE, INVALID_REQUEST_CODE, INVALID_REQUEST_MESSAGE,
    SUCCESS_CODE, SUCCESS_MESSAGE, UNAUTHORISED_CODE, UNAUTHORISED_MESSAGE } from "../utils/status_codes";

const createUser = onRequest(async (req: any, res: any) => {

    if (!isPostReq(req.method)) return res.status(INVALID_REQUEST_CODE).send(INVALID_REQUEST_MESSAGE);

    const body: any = req.body;
    const token: string = req.headers.authorization;
    const userEmail: string = body.email.toLowerCase();
    if (!(await authenticateUserToken(token, userEmail))) return res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);

    // Create new user
    const ref: CollectionReference = db.collection("users");

    try {
        await ref.doc(userEmail).set({
            email: userEmail,
            first_name: body.first_name,
            surname: body.surname
        });
    } catch (error) {
        console.log("ERROR: ", error);
        return res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
    }

    return res.status(SUCCESS_CODE).send(SUCCESS_MESSAGE);
});

const createFamilyAccount = onRequest(async (req: any, res: any) => {

    if (!isPostReq(req.method)) return res.status(INVALID_REQUEST_CODE).send(INVALID_REQUEST_MESSAGE);

    const body: any = req.body;
    const token: string = req.headers.authorization;
    const userEmail: string = body.email.toLowerCase();
    if (!(await authenticateUserToken(token, userEmail))) return res.status(UNAUTHORISED_CODE).send(UNAUTHORISED_MESSAGE);

    const ref: CollectionReference = db.collection("families");

    try {
        await ref.add({
            name: body.family_name,
            creator: body.email
        });
    } catch(error) {
        return res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
    }

    return res.status(SUCCESS_CODE).send(SUCCESS_MESSAGE);
});

export {
    createUser,
    createFamilyAccount
}