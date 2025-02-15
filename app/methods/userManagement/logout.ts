import { auth } from "../firebase";

async function userLogout(): Promise<void> {
    await auth.signOut();
}

export {
    userLogout
}