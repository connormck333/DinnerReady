import { getUserInfo, removeAdminStatusFromFamilyMember, setUserAsFamilyAdmin } from "./src/triggers/account";
import { createJoinCode } from "./src/triggers/families";
import { createUser, createFamilyAccount, joinFamilyAccountAsAdmin, joinFamilyAccountAsMember } from "./src/triggers/registration";

module.exports = {
    createUser,
    createFamilyAccount,
    joinFamilyAccountAsAdmin,
    joinFamilyAccountAsMember,
    getUserInfo,
    setUserAsFamilyAdmin,
    removeAdminStatusFromFamilyMember,
    createJoinCode
};