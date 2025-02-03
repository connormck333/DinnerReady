import supertest, { Response } from 'supertest';
import { ENDPOINT } from './constants';

async function sendPostRequest(path: string,  body: any, auth_token: string): Promise<Response> {
    const request = supertest(ENDPOINT);
    const response = await request
        .post(path)
        .set("Authorization", auth_token)
        .send(body);

    return response;
}

export {
    sendPostRequest
}