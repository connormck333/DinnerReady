import { URL } from "../firebase";
import { GetParam, Status } from "./interfaces";

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
            return { success: false };
        }

        let data: any;
        try {
            data = await response.json();
        } catch (error: any) {}

        return { success: true, response: data };

    } catch (error: any) {
        return { success: false };
    }
}

async function sendGetRequest(endpoint: string, authToken: string, params: GetParam[]): Promise<Status> {
    try {
        const response = await fetch(URL + endpoint + formatParams(params), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': authToken,
                'Content-Type': 'application/json',
            }
        });

        if (response.status != 200) {
            return { success: false };
        }

        let data: any;
        try {
            data = await response.json();
        } catch (error: any) {}

        return { success: true, response: data };

    } catch (error: any) {
        return { success: false };
    }
}

async function sendDeleteRequest(endpoint: string, authToken: string, body: any): Promise<Status> {
    try {
        const response = await fetch(URL + endpoint, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (response.status != 200) {
            return { success: false };
        }

        return { success: true };

    } catch (error: any) {
        return { success: false };
    }
}

function formatParams(params: GetParam[]): string {
    let query = "?";
    for (let param of params) {
        query += "&" + param.key + "=" + encodeURIComponent(param.value);
    }

    return query;
}

export {
    sendPostRequest,
    sendGetRequest,
    sendDeleteRequest
}