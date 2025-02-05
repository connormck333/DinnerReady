import { Response } from 'supertest';
import { afterAll, beforeAll, describe, expect, jest, test } from "@jest/globals";
import { signIn } from "../test_utils/test_user";
import { SUCCESS_CODE } from "../../src/utils/status_codes";
import { sendGetRequest, sendPostRequest, sendPutRequest } from "../test_utils/requests";
import { GetParam } from '../test_utils/interfaces';

describe("Account unit tests", () => {
    const TEST_ACCOUNT: any = {
        email: "accountTest@testing.com",
        password: "testingpwd12345"
    }
    const ADMIN_ACCOUNT: any = {
        email: "adminTest@testing.com",
        password: "testingpwd12345"
    }
    let token: string;

    beforeAll(async () => {
        token = await signIn(TEST_ACCOUNT.email, TEST_ACCOUNT.password);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("Should get user info without joining family", async () => {
        const userInfo: any = {
            email: TEST_ACCOUNT.email,
            firstName: "Test",
            surname: "Account"
        }

        const userCreateResponse: Response = await sendPostRequest("/createUser", userInfo, token);
        expect(userCreateResponse.status).toBe(SUCCESS_CODE);

        const param: GetParam = {
            key: "email",
            value: userInfo.email
        }
        const response = await sendGetRequest("/getUserInfo", [param], token);

        expect(response.status).toBe(SUCCESS_CODE);
        expect(response.body).toHaveProperty("firstName", userInfo.firstName);
        expect(response.body).toHaveProperty("surname", userInfo.surname);
    });

    test("Should set user as admin from an admin account", async () => {
        // Create family account
        const familyBody: any = {
            email: TEST_ACCOUNT.email,
            familyName: "Test Family"
        }
        const familyResponse: Response = await sendPostRequest("/createFamilyAccount", familyBody, token);
        expect(familyResponse.status).toBe(SUCCESS_CODE);

        // Get new token for admin account
        const adminToken = await signIn(ADMIN_ACCOUNT.email, ADMIN_ACCOUNT.password);

        // Create new user
        const adminInfo: any = {
            email: ADMIN_ACCOUNT.email,
            firstName: "Admin",
            surname: "Account"
        }
        const userCreateResponse: Response = await sendPostRequest("/createUser", adminInfo, adminToken);
        expect(userCreateResponse.status).toBe(SUCCESS_CODE);

        // Join family
        const adminFamilyInfo: any = {
            email: ADMIN_ACCOUNT.email,
            familyId: familyResponse.body.familyId
        }
        const memberResponse: Response = await sendPostRequest("/joinFamilyAccountAsMember", adminFamilyInfo, adminToken);
        expect(memberResponse.status).toBe(SUCCESS_CODE);

        // Set new member as admin
        const body: any = {
            email: TEST_ACCOUNT.email,
            adminEmail: adminInfo.email
        }
        const response: Response = await sendPutRequest("/setUserAsFamilyAdmin", body, token);
        expect(response.status).toBe(SUCCESS_CODE);
    });
});