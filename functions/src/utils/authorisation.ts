import { auth } from "./admin";

async function authenticateUserToken(token: string | undefined, userEmail: string) : Promise<boolean> {
    if (token === undefined) return false;

    const data: any = await auth.verifyIdToken(token);
    console.log(data.email);
    console.log(userEmail);
    return data.email.toLowerCase() === userEmail.toLowerCase();
}

export {
    authenticateUserToken
}