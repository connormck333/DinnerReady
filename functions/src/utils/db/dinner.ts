import { CollectionReference, DocumentReference, DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { Attendee, Dinner, DinnerStatus, QueryResponse, User } from "../../types/interfaces";
import { db } from "../admin";
import QueryStatus from "../../types/query_status";
import { getFamilyMembers } from "./families";

async function createNewDinner(familyId: string, dinnerData: Dinner): Promise<QueryResponse> {
    const ref: CollectionReference = db
        .collection("families")
        .doc(familyId)
        .collection("dinners");
    
    try {
        const doc: DocumentReference = await ref.add({
            announcedAtTimestamp: dinnerData.announcedAtTimestamp,
            startsAtTimestamp: dinnerData.startsAtTimestamp,
            endsAtTimestamp: dinnerData.endsAtTimestamp,
            description: dinnerData.description,
            date: dinnerData.date
        });

        const dinner: Dinner = {
            ...dinnerData,
            dinnerId: doc.id
        }

        return { status: QueryStatus.SUCCESS, data: dinner };
    } catch (error) {
        return { status: QueryStatus.FAILURE };
    }
}

async function getDinner(familyId: string, dinnerId: string): Promise<QueryResponse> {
    const ref: DocumentReference = db
        .collection("families")
        .doc(familyId)
        .collection("dinners")
        .doc(dinnerId);

    let dinnerData: Dinner;
    try {
        const data: DocumentSnapshot = await ref.get();
        dinnerData = {
            dinnerId: dinnerId,
            announcedAtTimestamp: data.data()?.announcedAtTimestamp,
            startsAtTimestamp: data.data()?.startsAtTimestamp,
            endsAtTimestamp: data.data()?.endsAtTimestamp,
            description: data.data()?.description,
            date: data.data()?.date
        }
    } catch (error) {
        return { status: QueryStatus.FAILURE };
    }

    const membersResponse: QueryResponse = await getFamilyMembers(familyId, undefined);
    if (membersResponse.status === QueryStatus.FAILURE) {
        return { status: QueryStatus.FAILURE };
    }

    const attendees: Attendee[] = [];
    const familyMembers: User[] = membersResponse.data;
    try {
        for (let user of familyMembers) {
            if (user.email === undefined) continue;
            const attendingStatus: boolean = await getAttendanceForDinner(user.email, familyId, dinnerId);
            attendees.push({
                user: user,
                attending: attendingStatus
            });
        }
    } catch (error) {
        return { status: QueryStatus.FAILURE };
    }

    const dinnerStatus: DinnerStatus = {
        attendance: attendees,
        dinner: dinnerData
    }

    return { status: QueryStatus.SUCCESS, data: dinnerStatus };
}

async function setAttendanceForDinnerWithId(userId: string, familyId: string, dinnerId: string, attendingStatus: boolean): Promise<boolean> {
    const ref: DocumentReference = db
        .collection("families")
        .doc(familyId)
        .collection("dinners")
        .doc(dinnerId);

    try {
        await ref.collection("responses").doc(userId).set({
            email: userId,
            attending: attendingStatus
        });

        await db.collection("users").doc(userId).collection("responses").doc(dinnerId).set({
            dinnerId: dinnerId
        });
    } catch (error) {
        return false;
    }

    return true;
}

async function setAttendanceForDinnerWithoutId(userId: string, familyId: string, attendingStatus: boolean, date: string): Promise<boolean> {
    const ref: CollectionReference = db
        .collection("families")
        .doc(familyId)
        .collection("dinners");

    try {
        // Create new dinner with date
        const doc: DocumentReference = await ref.add({
            date: date
        });

        // Set attendance
        const success: boolean = await setAttendanceForDinnerWithId(userId, familyId, doc.id, attendingStatus);

        return success;
    } catch (error) {
        return false;
    }
}

async function getAttendanceForDinner(userId: string, familyId: string, dinnerId: string): Promise<boolean> {
    const ref: DocumentReference = db
        .collection("families")
        .doc(familyId)
        .collection("dinners")
        .doc(dinnerId);

    try {
        const doc: DocumentSnapshot = await ref.collection("responses").doc(userId).get();
        return doc.data()?.attending;
    } catch (error) {
        return false;
    }
}

async function doesDinnerExist(familyId: string, date: string): Promise<QueryResponse> {
    const ref: CollectionReference = db
        .collection("families")
        .doc(familyId)
        .collection("dinners")

    try {
        const response: QuerySnapshot = await ref.where("date", "==", date).get();
        return {
            status: QueryStatus.SUCCESS,
            data: {
                exists: response.docs.length > 0,
                dinnerId: response.docs.length > 0 ? response.docs[0].id : null
            }
        };
    } catch (error) {
        return { status: QueryStatus.FAILURE };
    }
}

async function getUserAttendanceCalendar(userId: string, familyId: string): Promise<QueryResponse> {
    const userRef: CollectionReference = db
        .collection("users")
        .doc(userId)
        .collection("responses");

    const dinnerRef: CollectionReference = db
        .collection("families")
        .doc(familyId)
        .collection("dinners")

    try {
        const response: QuerySnapshot = await userRef.get();

        const attendances: any[] = [];
        for (let doc of response.docs) {
            const dinnerDate: DocumentSnapshot = await dinnerRef.doc(doc.id).get();
            const dinner = await dinnerRef.doc(doc.id).collection("responses").doc(userId).get();
            attendances.push({
                date: dinnerDate.data()?.date,
                attending: dinner.data()?.attending
            });
        }

        return { status: QueryStatus.SUCCESS, data: attendances };
    } catch (error) {
        return { status: QueryStatus.FAILURE };
    }
}

export {
    createNewDinner,
    setAttendanceForDinnerWithId,
    setAttendanceForDinnerWithoutId,
    getDinner,
    doesDinnerExist,
    getUserAttendanceCalendar
}