import { getDownloadURL, ref, StorageReference, uploadBytes, UploadResult } from "firebase/storage";
import { storage } from "../firebase";
import { Status } from "../utils/interfaces";

async function saveAvatar(uri: string, location: string): Promise<Status> {
    try {
        const blob: Blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
    
        const fileRef: StorageReference = ref(storage, location);
        const result: UploadResult = await uploadBytes(fileRef, blob);
    
        return { success: true, response: await getDownloadURL(fileRef) };
    } catch (error) {
        console.log(error);
        return { success: false, response: null };
    }
}

async function saveUserAvatar(uri: string, email: string): Promise<Status> {
    console.log(email);
    return await saveAvatar(uri, "users/" + email.toLowerCase());
}

async function saveFamilyAvatar(uri: string, familyId: string): Promise<Status> {
    return await saveAvatar(uri, "families/" + familyId);
}

export {
    saveUserAvatar,
    saveFamilyAvatar
}