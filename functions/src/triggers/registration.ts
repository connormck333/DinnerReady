import { onRequest, Request } from "firebase-functions/v2/https";
import { Response } from "express";
import { db } from "../utils/admin";
import { isPostReq } from "../utils/request_utils";
import { authenticateUserToken } from "../utils/authorisation";
import { CollectionReference, DocumentReference } from "firebase-admin/firestore";
import { GENERAL_ERROR_CODE, GENERAL_ERROR_MESSAGE, INVALID_REQUEST_CODE, INVALID_REQUEST_MESSAGE,
    SUCCESS_CODE, SUCCESS_MESSAGE, UNAUTHORISED_CODE, UNAUTHORISED_MESSAGE } from "../utils/status_codes";
import { addUserToFamily } from "../utils/db/families";

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

    // Create new user
    const ref: CollectionReference = db.collection("users");

    try {
        await ref.doc(userEmail).set({
            email: userEmail,
            firstName: body.first_name,
            surname: body.surname
        });
    } catch (error) {
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

    // Create new family doc
    const familiesRef: CollectionReference = db.collection("families");
    let familyDoc: DocumentReference;

    try {
        familyDoc = await familiesRef.add({
            name: body.family_name,
            creator: body.email
        });
    } catch(error) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    // Save family id to user
    const usersRef: CollectionReference = db.collection("users");

    try {
        await usersRef.doc(userEmail).set({
            familyId: familyDoc.id
        }, { merge: true })
    } catch(error) {
        res.status(GENERAL_ERROR_CODE).send(GENERAL_ERROR_MESSAGE);
        return;
    }

    res.status(SUCCESS_CODE).send(SUCCESS_MESSAGE);
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