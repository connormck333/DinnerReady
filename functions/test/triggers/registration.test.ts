import { afterAll, beforeAll, describe, expect, jest, test,  } from "@jest/globals";
import { signIn } from "../test_utils/test_user";
import { TEST_FAMILY, TEST_USER } from "../test_utils/constants";
import { SUCCESS_CODE } from "../../src/utils/status_codes";
import { sendPostRequest } from "../test_utils/requests";

describe("Registration unit tests", () => {
    let token: string;

    beforeAll(async () => {
        token = await signIn();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("Should save new user's details", async () => {
        const body = {
            email: TEST_USER.email,
            first_name: TEST_USER.first_name,
            surname: TEST_USER.surname
        };

        const response = await sendPostRequest("/createUser", body, token);

        expect(response.status).toBe(SUCCESS_CODE);
    });

    test("Should save new family's details", async () => {
        const body = TEST_FAMILY;

        const response = await sendPostRequest("/createFamilyAccount", body, token);

        expect(response.status).toBe(SUCCESS_CODE);
    });
});
