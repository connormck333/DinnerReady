import { initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    projectId: process.env.PROJECT_ID,
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth: Auth = getAuth(app);

connectAuthEmulator(auth, "http://127.0.0.1:9099");

export {
    db,
    auth
}