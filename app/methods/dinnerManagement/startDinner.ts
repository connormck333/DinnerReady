import { auth } from "../firebase";
import { Status } from "../utils/interfaces";
import { sendPostRequest } from "../utils/requests";

async function startDinner(userId: string, date: string, description: string): Promise<Status> {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return await sendPostRequest("startDinner", authToken, {
        email: userId,
        date: date,
        description: description
    });
}

export {
    startDinner
}