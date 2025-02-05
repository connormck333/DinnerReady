import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './admin';

async function signIn(email: string, password: string): Promise<string> {
    await createUserWithEmailAndPassword(auth, email, password);
    const token = await auth.currentUser?.getIdToken();

    return token === undefined ? "" : token;
}

export {
    signIn
}