import { afterAll, describe, expect, jest, test,  } from "@jest/globals";
import supertest from 'supertest';
import { signIn } from "../test_utils/test_user";

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
        const token = await signIn();

        if (token === undefined) {
            throw Error;
        }

        const response = await request
            .post("/createUser")
            .set("Authorization", token)
            .send({
                ...body
            });

        expect(response.status).toBe(201);
    });
});
