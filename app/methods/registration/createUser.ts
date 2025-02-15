import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NewUser, Status } from "../utils/interfaces";
import { sendPostRequest } from "../utils/requests";

async function createNewUser(user: NewUser): Promise<Status> {
    try {
        const response = await createUserWithEmailAndPassword(auth, user.email, user.password);

        const token: string = await response.user.getIdToken();
        const saveInfoResponse: Status = await saveUserInfo(user, token);

        if (saveInfoResponse.success) {
            return { success: true, response: response.user };
        } else {
            return { success: false, response: undefined };
        }
    } catch (error: unknown) {
        console.log(error);
        return { success: false, response: undefined };
    }
}

async function saveUserInfo(user: NewUser, authToken: string): Promise<Status> {
    return await sendPostRequest("createUser", authToken, {
        email: user.email,
        firstName: user.firstName,
        surname: user.lastName
    });
}

export default createNewUser;