import { auth } from "../firebase";
import { Status } from "../utils/interfaces";
import { sendDeleteRequest } from "../utils/requests";

async function deleteUserAvatar(userId: string): Promise<Status> {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return await sendDeleteRequest("deleteUserAvatar", authToken, {email: userId});
}

export {
    deleteUserAvatar
}