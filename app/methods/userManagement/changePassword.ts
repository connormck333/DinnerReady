import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, User } from "firebase/auth";
import { Status } from "../utils/interfaces";
import { auth } from "../firebase";

async function changePassword(userId: string, currentPassword: string, newPassword: string): Promise<Status> {
    try {
        reauthenticate(userId, currentPassword);
        await updatePassword(auth.currentUser as User, newPassword);
    } catch (error) {
        return { success: false };
    }

    return { success: true };
}

async function reauthenticate(userId: string, currentPassword: string): Promise<Status> {
    try {
        const credential = EmailAuthProvider.credential(userId, currentPassword);
        const result = await reauthenticateWithCredential(auth.currentUser as User, credential);
        if (result.user) {
            return { success: true };
        }
    } catch (err) {}

    return { success: false };
}

export {
    changePassword
}