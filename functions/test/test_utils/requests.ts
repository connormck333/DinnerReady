import supertest, { Response } from 'supertest';
import { ENDPOINT } from './constants';
import { GetParam } from './interfaces';

async function sendPostRequest(path: string, body: any, authToken: string): Promise<Response> {
    const request = supertest(ENDPOINT);
    const response = await request
        .post(path)
        .set("Authorization", authToken)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(body);

    return response;
}

async function sendGetRequest(path: string, params: GetParam[], authToken: string): Promise<Response> {
    const request = supertest(ENDPOINT);
    const response = await request
        .get(path + formatParams(params))
        .set("Authorization", authToken)
        .set("Accept", "application/json")
        .send();

    return response;
}

async function sendPutRequest(path: string, body: any, authToken: string): Promise<Response> {
    const request = supertest(ENDPOINT);
    const response = await request
        .put(path)
        .set("Authorization", authToken)
        .set("Content-Type", "application/json")
        .send(body);

    return response;
}

function formatParams(params: GetParam[]): string {
    let query = "";
    for (let param of params) {
        query += "?" + param.key + "=" + encodeURIComponent(param.value);
    }

    return query;
}

export {
    sendPostRequest,
    sendGetRequest,
    sendPutRequest
}