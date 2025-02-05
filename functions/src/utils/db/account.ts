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
            familyId: snapshot.data()?.familyId,
            admin: snapshot.data()?.admin
        }
        return { status: QueryStatus.SUCCESS, data: userData };
    } catch(error) {
        return { status: QueryStatus.FAILURE, data: null };
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
    getUserData,
    isUserAdmin,
    getFamilyId
}