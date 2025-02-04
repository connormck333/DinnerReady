import { getUserInfo, removeAdminStatusFromFamilyMember, setUserAsFamilyAdmin } from "./src/triggers/account";
import { createUser, createFamilyAccount, joinFamilyAccountAsAdmin, joinFamilyAccountAsMember } from "./src/triggers/registration";

module.exports = {
    createUser,
    createFamilyAccount,
    joinFamilyAccountAsAdmin,
    joinFamilyAccountAsMember,
    getUserInfo,
    setUserAsFamilyAdmin,
    removeAdminStatusFromFamilyMember
};