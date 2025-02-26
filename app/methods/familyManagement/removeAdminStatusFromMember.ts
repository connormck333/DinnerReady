import { auth } from "../firebase";
import { Status } from "../utils/interfaces";
import { sendPutRequest } from "../utils/requests";

async function removeAdminStatusFromFamilyMember(userId: string, adminId: string): Promise<Status> {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return await sendPutRequest("removeAdminStatusFromFamilyMember", authToken, {
        email: userId,
        adminEmail: adminId
    });
}

export {
    removeAdminStatusFromFamilyMember
}