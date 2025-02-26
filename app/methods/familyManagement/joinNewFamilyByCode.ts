import { auth } from "../firebase";
import { Status } from "../utils/interfaces";
import { sendPostRequest } from "../utils/requests";

async function joinNewFamilyByCode(userId: string, code: string): Promise<Status> {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return sendPostRequest("joinNewFamilyUsingCode", authToken, {
        email: userId,
        code: code
    });
}

export {
    joinNewFamilyByCode
}