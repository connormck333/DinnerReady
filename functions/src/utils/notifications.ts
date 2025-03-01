import { Notification } from "../types/interfaces";

const fetch: (url: string, init?: RequestInit) => Promise<Response> = require("node-fetch");

const EXPO_PUSH_API_URL = "https://exp.host/--/api/v2/push/send";

async function sendNotification(deviceTokens: string[], title: string, body: string): Promise<boolean> {
    
    const messages = deviceTokens.map((token: string): Notification => ({
        to: token,
        sound: "default",
        title: title,
        body: body
    }));

    try {
        const response = await fetch(EXPO_PUSH_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(messages)
        });

        console.log(response);
    
        return response.ok;
    } catch (error) {
        console.log(error);
    }

    return false;
}

export {
    sendNotification
}