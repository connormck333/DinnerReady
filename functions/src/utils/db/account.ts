import { CollectionReference, DocumentSnapshot } from "firebase-admin/firestore";
import { QueryResponse, QueryResponseExists, User } from "../../types/interfaces";
import { db } from "../admin";
import QueryStatus from "../../types/query_status";

async function createNewUser(userEmail: string, firstName: string, surname: string): Promise<boolean> {

    const doesUserExist: QueryResponseExists = await getUserData(userEmail);
    if (doesUserExist.status === QueryStatus.FAILURE || doesUserExist.exists) {
        return false;
    }

    const ref: CollectionReference = db.collection("users");
    try {
        await ref.doc(userEmail).set({
            email: userEmail,
            firstName: firstName,
            surname: surname
        });
    } catch (error) {
        return false;
    }

    return true;
}

async function getUserData(userId: string): Promise<QueryResponseExists> {
    try {
        const snapshot: DocumentSnapshot = await db.collection("users").doc(userId).get();
        if (!snapshot.exists) {
            return { status: QueryStatus.SUCCESS, data: null, exists: false };
        }
        const userData: User = {
            firstName: snapshot.data()?.firstName,
            surname: snapshot.data()?.surname,
            email: userId,
            familyId: snapshot.data()?.familyId,
            admin: snapshot.data()?.admin
        }
        return { status: QueryStatus.SUCCESS, data: userData, exists: true };
    } catch(error) {
        return { status: QueryStatus.FAILURE, data: null, exists: false };
    }
}

async function isUserAdmin(userId: string): Promise<QueryResponse> {
    const queryResponse = await getUserData(userId);
    if (queryResponse.status === QueryStatus.FAILURE) return { status: QueryStatus.FAILURE, data: false };

    const userData: User = queryResponse.data;

    return { status: QueryStatus.SUCCESS, data: userData.admin };
}

async function getFamilyId(userId: string): Promise<QueryResponse> {
    const userDataResponse: QueryResponse = await getUserData(userId);
    const userData: User = userDataResponse.data;
    if (userDataResponse.status === QueryStatus.FAILURE || userData.familyId === undefined) {
        return { status: QueryStatus.FAILURE, data: null };
    }

    return { status: QueryStatus.SUCCESS, data: userData.familyId }
}

export {
    createNewUser,
    getUserData,
    isUserAdmin,
    getFamilyId
}