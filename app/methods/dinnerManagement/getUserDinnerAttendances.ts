import { auth } from "../firebase";
import { Status } from "../utils/interfaces";
import { sendGetRequest } from "../utils/requests";

async function getUserDinnerAttendances(userId: string): Promise<Status> {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return await sendGetRequest("getUserDinnerAttendances", authToken, [{key: "email", value: userId}]);
}

export {
    getUserDinnerAttendances
}