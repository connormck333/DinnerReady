import { auth } from "../firebase";
import { Status } from "../utils/interfaces";
import { sendPostRequest } from "../utils/requests"

async function createFamilyAccount(email: string, familyName: string): Promise<Status> {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return sendPostRequest("createFamilyAccount", authToken, {
        email: email,
        familyName: familyName
    });
}

export {
    createFamilyAccount
}