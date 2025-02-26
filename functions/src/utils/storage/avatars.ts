import { BUCKET_NAME, storage } from "../admin";

async function deleteUserAvatarFromStorage(userId: string): Promise<boolean> {
    try {
        await storage.bucket(BUCKET_NAME).file("users/" + userId.toLowerCase()).delete({ignoreNotFound: true});
    } catch (error) {
        return false;
    }

    return true;
}

export {
    deleteUserAvatarFromStorage
}