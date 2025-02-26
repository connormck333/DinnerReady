import { auth } from "../firebase";
import { Status } from "../utils/interfaces";
import { sendPutRequest } from "../utils/requests";

async function setUserAsAdmin(userId: string, adminEmail: string): Promise<Status> {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return await sendPutRequest("setUserAsFamilyAdmin", authToken, {
        email: userId,
        adminEmail: adminEmail
    });
}

export {
    setUserAsAdmin
}