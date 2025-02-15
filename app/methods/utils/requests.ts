import { URL } from "../firebase";
import { Status } from "./interfaces";

async function sendPostRequest(endpoint: string, authToken: string, body: any): Promise<Status> {
    try {
        const response = await fetch(URL + endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (response.status != 200) {
            return { success: false, response: undefined };
        }

        let data: any;
        try {
            data = await response.json();
        } catch (error: any) {}

        return { success: true, response: data };

    } catch (error: any) {
        console.log(error);
        return { success: false, response: undefined };
    }
}

export {
    sendPostRequest
}