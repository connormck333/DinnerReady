import { afterAll, describe, expect, jest, test } from "@jest/globals";
import supertest from 'supertest';

const request = supertest('http://127.0.0.1:5001/dinner-ready-d541f/us-central1/createUser');

describe("Registration unit tests", () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    test("Should create new user in Firestore", async () => {
        const body = {
            email: "testemail@example.com",
            first_name: "Test",
            surname: "Account"
        };

        const response = await request.post("/createUser").send({
            ...body
        });

        expect(response.status).toBe(200);
    });
});
