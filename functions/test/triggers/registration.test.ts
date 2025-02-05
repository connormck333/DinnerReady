import { Response } from 'supertest';
import { afterAll, beforeAll, describe, expect, jest, test,  } from "@jest/globals";
import { signIn } from "../test_utils/test_user";
import { TEST_FAMILY, TEST_USER } from "../test_utils/constants";
import { GENERAL_ERROR_CODE, SUCCESS_CODE, UNAUTHORISED_CODE } from "../../src/utils/status_codes";
import { sendPostRequest } from "../test_utils/requests";

describe("Registration unit tests", () => {
    let token: string;
    let familyId: string;

    beforeAll(async () => {
        token = await signIn(TEST_USER.email, TEST_USER.password);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("Should create user", async () => {
        const body: any = {
            email: TEST_USER.email,
            firstName: TEST_USER.firstName,
            surname: TEST_USER.surname
        };

        const response: Response = await sendPostRequest("/createUser", body, token);

        expect(response.status).toBe(SUCCESS_CODE);
    });

    test("Should not create same user more than once", async () => {
        const body: any = {
            email: TEST_USER.email,
            firstName: "Test 1",
            surname: TEST_USER.surname
        };

        const response: Response = await sendPostRequest("/createUser", body, token);

        expect(response.status).toBe(GENERAL_ERROR_CODE);
    });

    test("Should not create user when auth token not valid", async () => {
        const body: any = {
            email: TEST_USER.email,
            firstName: "Test 2",
            surname: TEST_USER.surname
        };

        const response: Response = await sendPostRequest("/createUser", body, "");

        expect(response.status).toBe(UNAUTHORISED_CODE);
    });

    test("Should create family", async () => {
        const body: any = TEST_FAMILY;

        const response: Response = await sendPostRequest("/createFamilyAccount", body, token);
        familyId = response.body;
        
        expect(response.status).toBe(SUCCESS_CODE);
    });

    test("Should not create family when already in a family", async () => {
        const body: any = TEST_FAMILY;

        const response: Response = await sendPostRequest("/createFamilyAccount", body, token);

        expect(response.status).toBe(GENERAL_ERROR_CODE);
    });

    test("Should join family as admin", async () => {
        const userBody: any = {
            email: "admin@test.com",
            firstName: TEST_USER.firstName,
            surname: TEST_USER.surname
        };
        const adminToken: string = await signIn(userBody.email, "testingpassword123");

        // Create new user
        const createUserResponse: Response = await sendPostRequest("/createUser", userBody, adminToken);
        expect(createUserResponse.status).toBe(SUCCESS_CODE);

        const adminBody: any = {
            email: "admin@test.com",
            familyId: familyId
        }

        const adminResponse: Response = await sendPostRequest("/joinFamilyAccountAsAdmin", adminBody, adminToken);

        expect(adminResponse.status).toBe(SUCCESS_CODE);
    });

    test("Should join family as member", async () => {
        const userBody: any = {
            email: "test_member@test.com",
            firstName: TEST_USER.firstName,
            surname: TEST_USER.surname
        };
        const memberToken: string = await signIn(userBody.email, "testingpassword123");

        const createUserResponse: Response = await sendPostRequest("/createUser", userBody, memberToken);
        expect(createUserResponse.status).toBe(SUCCESS_CODE);

        const memberBody: any = {
            email: "test_member@test.com",
            familyId: familyId
        }

        const memberResponse: Response = await sendPostRequest("/joinFamilyAccountAsMember", memberBody, memberToken);

        expect(memberResponse.status).toBe(SUCCESS_CODE);
    });
});
