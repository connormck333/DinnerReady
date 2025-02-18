import { auth } from "../firebase";
import { Status } from "../utils/interfaces";
import { sendPostRequest } from "../utils/requests";

async function optOutForDinner(userId: string, date: string): Promise<Status> {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return sendPostRequest('optOutForDinner', authToken, {
        email: userId,
        date: date
    });
}

export {
    optOutForDinner
}