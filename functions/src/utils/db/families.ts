import { CollectionReference, DocumentReference, DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { db } from "../admin";
import QueryStatus from "../../types/query_status";
import { QueryResponse, QueryResponseExists, User } from "../../types/interfaces";
import { getUserData } from "./account";

async function createNewFamily(userEmail: string, familyName: string): Promise<QueryResponse> {

    // Check user exists and does not already belong to a family
    const userData: QueryResponseExists = await getUserData(userEmail);
    if (userData.status === QueryStatus.FAILURE || !userData.exists || userData.data?.familyId) {
        return { status: QueryStatus.FAILURE, data: null };
    }

    const familiesRef: CollectionReference = db.collection("families");

    try {
        // Create new family doc
        const familyDoc: DocumentReference = await familiesRef.add({
            name: familyName,
            creator: userEmail
        });

        // Add requesting user as admin
        await addUserToFamily(familyDoc.id, userEmail, true);

        // Save family Id to user
        const usersRef: CollectionReference = db.collection("users");
        await usersRef.doc(userEmail).set({
            familyId: familyDoc.id,
            admin: true,
            hasCompletedOnboarding: true
        }, { merge: true });

        return { status: QueryStatus.SUCCESS, data: familyDoc.id };
    } catch (error) {
        return { status: QueryStatus.FAILURE, data: null };
    }
}

async function addUserToFamily(familyId: string, userId: string, admin: boolean): Promise<boolean> {
    try {
        const familiesRef: DocumentReference = db.collection("families").doc(familyId);
        await familiesRef.collection("members").doc(userId).set({
            email: userId,
            admin: admin
        });

        await db.collection("users").doc(userId).set({
            familyId: familyId,
            admin: admin
        }, { merge: true });
    } catch (error) {
        return false;
    }

    return true;
}

async function getFamilyMembers(familyId: string, userId: string | undefined): Promise<QueryResponse> {
    const members: User[] = [];
    try {
        const membersCollection: QuerySnapshot = await db.collection("families").doc(familyId).collection("members").get();
        for (let i = 0; i < membersCollection.docs.length; i++) {
            const memberSnap: DocumentSnapshot = membersCollection.docs[i];
            if (userId === memberSnap.data()?.email) continue;
            
            const memberUserSnap: DocumentSnapshot = await db.collection("users").doc(memberSnap.data()?.email).get();
            const memberData: User = {
                email: memberUserSnap.data()?.email,
                firstName: memberUserSnap.data()?.firstName,
                lastName: memberUserSnap.data()?.surname,
                familyId: familyId,
                admin: memberUserSnap.data()?.admin
            }
            members.push(memberData);
        }
    } catch (error) {
        return {status: QueryStatus.FAILURE, data: []};
    }

    return {status: QueryStatus.SUCCESS, data: members};
}

async function updateUsersAdminStatus(userId: string, familyId: string, admin: boolean): Promise<boolean> {
    try {
        const queryResponse: QueryResponseExists = await getUserData(userId);
        if (queryResponse.status === QueryStatus.FAILURE || !queryResponse.exists) return false;

        const userData: User = queryResponse.data;
        if (!userData.familyId || userData.familyId.toLowerCase() !== familyId.toLowerCase()) return false;

        await db.collection("users").doc(userId).set({
            admin: admin
        }, { merge: true });

        await db.collection("families").doc(userData.familyId).collection("members").doc(userId).set({
            admin: admin
        }, { merge: true });

        return true;
    } catch (error) {
        return false;
    }
}

async function getFamilyCreator(familyId: string): Promise<QueryResponseExists> {
    try {
        const snapshot: DocumentSnapshot = await db.collection("families").doc(familyId).get();
        if (!snapshot.exists) {
            return { status: QueryStatus.SUCCESS, exists: false };
        }

        return { status: QueryStatus.SUCCESS, exists: true, data: snapshot.data()?.creator };
    } catch (error) {
        return { status: QueryStatus.FAILURE, exists: false };
    }
}

async function createFamilyJoinCode(userId: string): Promise<QueryResponse> {
    const code = (Date.now().toString(36) + Math.random().toString(36).substring(13)).toUpperCase();

    const response: QueryResponseExists = await getUserData(userId);
    if (response.status === QueryStatus.FAILURE || !response.exists) {
        return { status: response.status };
    }

    const familyId: string = response.data.familyId;

    try {
        await db.collection("joinCodes").doc(code).set({
            familyId: familyId,
            code: code
        });
    } catch (error) {
        return { status: QueryStatus.FAILURE };
    }

    return { status: QueryStatus.SUCCESS, data: code };
}

async function joinFamilyByJoinCode(userId: string, code: string): Promise<boolean> {
    const response: QueryResponseExists = await getUserData(userId);
    if (response.status === QueryStatus.FAILURE || !response.exists || response.data?.familyId != null) {
        return false;
    }

    const codeDoc: DocumentSnapshot = await db.collection("joinCodes").doc(code).get();
    if (!codeDoc.exists) {
        return false;
    }

    const familyId: string = codeDoc.data()?.familyId;
    const success: boolean = await addUserToFamily(familyId, userId, false);

    await db.collection("users").doc(userId).set({
        hasCompletedOnboarding: true
    }, { merge: true });

    return success;
}

async function leaveFamily(userId: string): Promise<boolean> {
    const response: QueryResponseExists = await getUserData(userId);
    if (response.status === QueryStatus.FAILURE || !response.exists || response.data?.familyId == null) {
        return false;
    }

    const userData: User = response.data;
    console.log(userData);

    try {
        const familyRef: DocumentReference = db.collection("families").doc(userData.familyId as string);
        await familyRef.collection("members").doc(userId).delete();
        await db.collection("users").doc(userId).set({
            familyId: null,
            admin: false
        }, { merge: true });
    } catch (error) {
        console.log(error);
        return false;
    }

    return true;
}

async function doesJoinCodeExist(code: string): Promise<boolean> {
    const codeDoc: DocumentSnapshot = await db.collection("joinCodes").doc(code).get();
    return codeDoc.exists;
}

export {
    addUserToFamily,
    getFamilyMembers,
    updateUsersAdminStatus,
    createNewFamily,
    getFamilyCreator,
    createFamilyJoinCode,
    joinFamilyByJoinCode,
    leaveFamily,
    doesJoinCodeExist
}