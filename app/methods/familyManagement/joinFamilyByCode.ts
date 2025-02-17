import { auth } from "../firebase";
import { sendPostRequest } from "../utils/requests";

async function joinFamilyByCode(userId: string, code: string) {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return await sendPostRequest('joinFamilyUsingCode', authToken, {
        email: userId,
        code: code
    });
}

export {
    joinFamilyByCode
}