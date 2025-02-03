import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './admin';

const TEST_USER = {
    email: "testuser@example.com",
    password: "testing12345"
}

async function signIn(): Promise<string | undefined> {
    await createUserWithEmailAndPassword(auth, TEST_USER.email, TEST_USER.password);
    const token = await auth.currentUser?.getIdToken();

    return token;
}

export {
    signIn
}