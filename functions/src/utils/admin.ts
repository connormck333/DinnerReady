import { initializeApp } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

const app = initializeApp({
    projectId: process.env.PROJECT_ID
});

const db = getFirestore(app);
const auth: Auth = getAuth(app);

export {
    db,
    auth
}