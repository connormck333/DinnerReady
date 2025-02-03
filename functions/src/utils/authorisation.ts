import { auth } from "./admin";

async function authenticateUserToken(token: string, userEmail: string) : Promise<boolean> {
    const data: any = await auth.verifyIdToken(token);
    return data.email.toLowerCase() === userEmail.toLowerCase();
}

export {
    authenticateUserToken
}