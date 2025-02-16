import { auth } from "../firebase";
import { Status } from "../utils/interfaces";
import { sendPostRequest } from "../utils/requests";

async function createJoinCode(email: string): Promise<Status> {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return await sendPostRequest('createJoinCode', authToken, {email: email});
}

export {
    createJoinCode
}