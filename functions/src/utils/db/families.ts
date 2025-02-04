import { DocumentReference, DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { db } from "../admin";
import QueryStatus from "../../types/query_status";
import { QueryResponse, User } from "../../types/interfaces";

async function addUserToFamily(familyId: string, userId: string, admin: boolean): Promise<boolean> {
    const familiesRef: DocumentReference = db.collection("families").doc(familyId);

    try {
        await familiesRef.collection("members").add({
            email: userId,
            admin: admin
        });
    } catch(error) {
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
                familyId: familyId
            }
            members.push(memberData);
        }
    } catch(error) {
        return {status: QueryStatus.FAILURE, data: []};
    }

    return {status: QueryStatus.SUCCESS, data: members};
}

export {
    addUserToFamily,
    getFamilyMembers
}