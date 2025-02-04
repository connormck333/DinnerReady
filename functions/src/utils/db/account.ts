import { DocumentSnapshot } from "firebase-admin/firestore";
import { QueryResponse, User } from "../../types/interfaces";
import { db } from "../admin";
import QueryStatus from "../../types/query_status";

async function getUserData(userId: string): Promise<QueryResponse> {
    try {
        const snapshot: DocumentSnapshot = await db.collection("users").doc(userId).get();
        const userData: User = {
            firstName: snapshot.data()?.firstName,
            surname: snapshot.data()?.surname,
            email: userId,
            familyId: snapshot.data()?.familyId
        }
        return { status: QueryStatus.SUCCESS, data: userData };
    } catch(error) {
        return { status: QueryStatus.FAILURE, data: null };
    }
}

export {
    getUserData
}