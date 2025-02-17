import { getAvatarUrl } from "../userManagement/getAvatarUrl";
import { User } from "../utils/interfaces";

async function getFamilyMembersAvatars(members: User[]): Promise<string[]> {
    const urls: string[] = [];
    await Promise.all(members.map(async (member) => {
        urls.push(await getAvatarUrl(member.email));
    }));

    return urls;
}

export {
    getFamilyMembersAvatars
}