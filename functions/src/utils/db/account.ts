import { CollectionReference, DocumentSnapshot } from "firebase-admin/firestore";
import { QueryResponse, QueryResponseExists, User } from "../../types/interfaces";
import { db } from "../admin";
import QueryStatus from "../../types/query_status";
import { getFamilyCreator } from "./families";

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
            surname: surname,
            hasCompletedOnboarding: false
        });
    } catch (error) {
        return false;
    }

    return true;
}

async function updateExistingUserDetails(userEmail: string, userDetails: User): Promise<boolean> {
    const ref: CollectionReference = db.collection("users");
    try {
        await ref.doc(userEmail).set({
            email: userEmail,
            firstName: userDetails.firstName,
            surname: userDetails.lastName
        }, { merge: true });
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
            lastName: snapshot.data()?.surname,
            email: userId,
            familyId: snapshot.data()?.familyId,
            admin: snapshot.data()?.admin,
            hasCompletedOnboarding: snapshot.data()?.hasCompletedOnboarding
        }
        return { status: QueryStatus.SUCCESS, data: userData, exists: true };
    } catch(error) {
        return { status: QueryStatus.FAILURE, data: null, exists: false };
    }
}

async function isUserAdmin(userId: string): Promise<QueryResponse> {
    const queryResponse: QueryResponseExists = await getUserData(userId);
    if (queryResponse.status === QueryStatus.FAILURE || !queryResponse.exists) {
        return { status: QueryStatus.FAILURE, data: false };
    }

    const userData: User = queryResponse.data;

    return { status: QueryStatus.SUCCESS, data: userData.admin };
}

async function isUserCreator(userId: string): Promise<QueryResponse> {
    const queryResponse: QueryResponseExists = await getUserData(userId);
    if (queryResponse.status === QueryStatus.FAILURE || !queryResponse.exists) {
        return { status: QueryStatus.FAILURE, data: false };
    }

    const userData: User = queryResponse.data;
    const familyId: string = userData.familyId as string;

    if (!familyId) {
        return { status: QueryStatus.SUCCESS, data: false };
    }

    const creatorResponse: QueryResponseExists = await getFamilyCreator(familyId);
    if (creatorResponse.status === QueryStatus.FAILURE || !creatorResponse.exists) {
        return { status: QueryStatus.FAILURE, data: false };
    }

    return { status: QueryStatus.SUCCESS, data: creatorResponse.data.toLowerCase() === userId.toLowerCase() };
}

async function getFamilyId(userId: string): Promise<QueryResponse> {
    const userDataResponse: QueryResponse = await getUserData(userId);
    const userData: User = userDataResponse.data;
    if (userDataResponse.status === QueryStatus.FAILURE || userData.familyId === undefined) {
        return { status: QueryStatus.FAILURE, data: null };
    }

    return { status: QueryStatus.SUCCESS, data: userData.familyId }
}

async function saveDeviceToken(userId: string, deviceToken: string): Promise<boolean> {
    try {
        await db.collection("users").doc(userId).set({
            deviceToken: deviceToken
        }, { merge: true });
    } catch (error) {
        return false;
    }

    return true;
}

export {
    createNewUser,
    getUserData,
    isUserAdmin,
    isUserCreator,
    getFamilyId,
    updateExistingUserDetails,
    saveDeviceToken
}