import { initializeApp } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import { getStorage, Storage } from 'firebase-admin/storage';

dotenv.config();

const app = initializeApp({
    projectId: process.env.PROJECT_ID
});

const db = getFirestore(app);
const auth: Auth = getAuth(app);
const storage: Storage = getStorage(app);
const BUCKET_NAME: string = process.env.PROJECT_ID + ".firebasestorage.app";

export {
    db,
    auth,
    storage,
    BUCKET_NAME
}