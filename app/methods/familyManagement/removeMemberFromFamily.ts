import { auth } from "../firebase";
import { Status } from "../utils/interfaces";
import { sendDeleteRequest } from "../utils/requests";

async function removeMemberFromFamily(userId: string, memberId: string): Promise<Status> {
    const authToken: string = await auth.currentUser?.getIdToken() as string;
    return await sendDeleteRequest("removeMemberFromFamily", authToken, {
        email: userId,
        memberId: memberId
    });
}

export {
    removeMemberFromFamily
}