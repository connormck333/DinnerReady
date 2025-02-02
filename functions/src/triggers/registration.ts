import { onRequest } from "firebase-functions/v2/https";

import { db } from "../utils/admin";
import { isPostReq } from "../utils/request_utils";
import { authenticateUserToken } from "../utils/authorisation";

const createUser = onRequest(async (req: any, res: any) => {

    if (!isPostReq(req.method)) return res.status(405).send("Invalid Request Method");

    const body: any = req.body;
    const token: string = req.headers.authorization;
    const userEmail: string = body.email.toLowerCase();
    if (!authenticateUserToken(token, userEmail)) return res.status(401).send("Unauthorised user");

    // Create new user
    const ref: any = db.collection("users");

    try {
        await ref.doc(userEmail).set({
            email: userEmail,
            first_name: body.first_name,
            surname: body.surname
        });
    } catch (error) {
        console.log("ERROR: ", error);
        return res.status(500).send("There was an error saving your details.");
    }

    return res.status(201).send("Registration successful");
});

const createFamilyAccount = onRequest(async (req: any, res: any) => {

    if (!isPostReq(req.method)) return res.status(405).send("Invalid Request Method");

    const body: any = req.body;
    const token: string = req.headers.authorization;
    const userEmail: string = body.email.toLowerCase();
    if (!authenticateUserToken(token, userEmail)) return res.status(401).send("Unauthorised user");

    const ref: any = db.collection("families");

    try {
        await ref.add({
            name: body.family_name,
            creator: body.email
        });
    } catch(error) {
        return res.status(500).send("There was an error saving your details.");
    }

    return res.status(201).send("Family account created");
});

export {
    createUser,
    createFamilyAccount
}