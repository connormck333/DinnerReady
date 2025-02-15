import { Status } from "../utils/interfaces";
import { sendGetRequest } from "../utils/requests";

async function getUserDetails(email: string, authToken: string) {
    const response: Status = await sendGetRequest('getUserInfo', authToken, [{key: 'email', value: email}]);

    return response;
}

export {
    getUserDetails
}