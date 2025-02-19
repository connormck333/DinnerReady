import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { storage } from "../firebase";

const DEFAULT_AVATAR_URL = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg'

async function getAvatarUrl(userId: string): Promise<string> {
    return await loadUrl("users/" + userId);
}

async function getFamilyAvatarUrl(familyId: string): Promise<string> {
    return await loadUrl("families/" + familyId);
}

async function loadUrl(refLocation: string): Promise<string> {
    try {
        const avatarRef: StorageReference = ref(storage, refLocation);
        const url: string = await getDownloadURL(avatarRef);
        return url;
    } catch (error) {
        return DEFAULT_AVATAR_URL;
    }
}

export {
    getAvatarUrl,
    getFamilyAvatarUrl,
    DEFAULT_AVATAR_URL
}