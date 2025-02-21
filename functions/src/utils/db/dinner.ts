import { CollectionReference, DocumentReference, DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { Attendee, Dinner, DinnerStatus, QueryResponse, QueryResponseExists, User } from "../../types/interfaces";
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

async function getDinner(familyId: string, dinnerDate: string): Promise<QueryResponse> {
    const ref: CollectionReference = db
        .collection("families")
        .doc(familyId)
        .collection("dinners");

    let dinnerData: Dinner | undefined;
    try {
        const snapshot: QuerySnapshot = await ref.where("date", "==", dinnerDate).get();
        if (snapshot.docs.length !== 0) {
            const data = snapshot.docs[0];
            dinnerData = {
                dinnerId: data.id,
                announcedAtTimestamp: data.data()?.announcedAtTimestamp,
                description: data.data()?.description,
                date: data.data()?.date
            }
        }
    } catch (error) {
        console.log("Could not find");
        return { status: QueryStatus.FAILURE };
    }

    const membersResponse: QueryResponse = await getFamilyMembers(familyId, undefined);
    if (membersResponse.status === QueryStatus.FAILURE) {
        console.log("Could not get family")
        return { status: QueryStatus.FAILURE };
    }

    const attendees: Attendee[] = [];
    const familyMembers: User[] = membersResponse.data;
    try {
        for (let user of familyMembers) {
            if (user.email === undefined) continue;
            if (dinnerData !== undefined) {
                const attendingStatus: boolean = await getAttendanceForDinner(user.email, familyId, dinnerData.dinnerId as string);
                attendees.push({
                    user: user,
                    attending: attendingStatus
                });
            } else {
                attendees.push({
                    user: user,
                    attending: undefined
                })
            }
        }
    } catch (error) {
        console.log("could not get dinner attendance");
        return { status: QueryStatus.FAILURE };
    }

    const dinnerStatus: DinnerStatus = {
        attendance: attendees,
        dinner: dinnerData
    }

    return { status: QueryStatus.SUCCESS, data: dinnerStatus };
}

async function setAnnouncedAtForDinner(familyId: string, dinnerId: string, announcedAt: number): Promise<boolean> {
    const ref: DocumentReference = db
        .collection("families")
        .doc(familyId)
        .collection("dinners")
        .doc(dinnerId)

    try {
        await ref.set({
            announcedAt: announcedAt
        }, {merge: true});
    } catch (error) {
        return false;
    }

    return true;
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

async function doesDinnerExist(familyId: string, date: string): Promise<QueryResponseExists> {
    const ref: CollectionReference = db
        .collection("families")
        .doc(familyId)
        .collection("dinners")

    try {
        const response: QuerySnapshot = await ref.where("date", "==", date).get();
        return {
            status: QueryStatus.SUCCESS,
            data: response.docs.length > 0 ? response.docs[0].id : null,
            exists: response.docs.length > 0
        };
    } catch (error) {
        return { status: QueryStatus.FAILURE, exists: false };
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
    getUserAttendanceCalendar,
    setAnnouncedAtForDinner
}