import { initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { Firestore, getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    projectId: process.env.PROJECT_ID,
    apiKey: "test-api-key",
    authDomain: process.env.AUTH_DOMAIN
}

const app = initializeApp(firebaseConfig);

const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

connectFirestoreEmulator(db, "http://127.0.0.1", 8080);
connectAuthEmulator(auth, "http://127.0.0.1:9099");

export {
    db,
    auth
}