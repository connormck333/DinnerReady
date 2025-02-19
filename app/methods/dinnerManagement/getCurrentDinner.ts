import { auth } from "../firebase";
import { Status } from "../utils/interfaces";
import { sendGetRequest } from "../utils/requests";

async function getCurrentDinner(userId: string): Promise<Status> {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return await sendGetRequest("getDinnerDetails", authToken, [
        {key: 'email', value: userId},
        {key: 'dinnerDate', value: new Date(Date.now()).toLocaleDateString("en-GB")}
    ]);
}

export {
    getCurrentDinner
}