import Constants from "expo-constants";
import { Alert } from "react-native";
import { auth } from "../firebase";
import { Status } from "../utils/interfaces";
import { sendPostRequest } from "../utils/requests";
import * as Notifications from 'expo-notifications';

async function saveDeviceToken(userId: string): Promise<Status> {
    const hasPerms: boolean = await getNotificationsPerms();
    if (hasPerms) {
        const authToken: string = await auth.currentUser?.getIdToken() as string;
        try {
            const deviceToken: Notifications.ExpoPushToken = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.projectId
            });
            return await sendPostRequest("saveUserDeviceToken", authToken, {
                email: userId,
                deviceToken: deviceToken.data
            });   
        } catch (error) {
            console.log(error);
        }
    }

    Alert.alert("Notifications", "DinnerReady relies on using push notifications. Please enable this in your settings.");

    return { success: false };
}

async function getNotificationsPerms(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    return finalStatus === "granted";
}

export {
    saveDeviceToken
}