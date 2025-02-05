import { auth } from "./admin";

async function authenticateUserToken(token: string | undefined, userEmail: string) : Promise<boolean> {
    if (token === undefined) return false;

    try {
        const data: any = await auth.verifyIdToken(token);
        return data.email.toLowerCase() === userEmail.toLowerCase();
    } catch (error) {
        return false;
    }
}

export {
    authenticateUserToken
}