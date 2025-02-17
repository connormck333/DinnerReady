import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

const DEFAULT_AVATAR_URL = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg'

async function getAvatarUrl(userId: string): Promise<string> {
    try {
        const avatarRef = ref(storage, 'users/' + userId);
        const url = await getDownloadURL(avatarRef);
        return url;
    } catch (error) {
        return DEFAULT_AVATAR_URL;
    }
}

export {
    getAvatarUrl
}