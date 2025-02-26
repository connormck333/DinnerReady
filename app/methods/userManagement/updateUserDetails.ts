import { auth } from "../firebase";
import { Status, User } from "../utils/interfaces";
import { sendPostRequest } from "../utils/requests";

async function updateUserDetails(userDetails: User): Promise<Status> {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return await sendPostRequest("updateUserDetails", authToken, userDetails);
}

export {
    updateUserDetails
}