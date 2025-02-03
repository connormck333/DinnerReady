import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './admin';
import { TEST_USER } from './constants';

async function signIn(): Promise<string> {
    await createUserWithEmailAndPassword(auth, TEST_USER.email, TEST_USER.password);
    const token = await auth.currentUser?.getIdToken();

    return token === undefined ? "" : token;
}

export {
    signIn
}