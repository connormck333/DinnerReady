import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

async function userLogin(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
}

export {
    userLogin
}