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
            admin: true
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
                surname: memberUserSnap.data()?.surname,
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
            return { status: QueryStatus.SUCCESS, exists: false, data: null };
        }

        return { status: QueryStatus.SUCCESS, exists: true, data: snapshot.data()?.creator };
    } catch (error) {
        return { status: QueryStatus.FAILURE, exists: false, data: null };
    }
}

export {
    addUserToFamily,
    getFamilyMembers,
    updateUsersAdminStatus,
    createNewFamily,
    getFamilyCreator
}