import { getUserInfo, removeAdminStatusFromFamilyMember, setUserAsFamilyAdmin } from "./src/triggers/account";
import { getDinnerDetails, getUserDinnerAttendances, optInForDinner, optOutForDinner, startDinner } from "./src/triggers/dinner";
import { createJoinCode, joinFamilyUsingCode } from "./src/triggers/families";
import { createUser, createFamilyAccount, joinFamilyAccountAsAdmin, joinFamilyAccountAsMember } from "./src/triggers/registration";

module.exports = {
    createUser,
    createFamilyAccount,
    joinFamilyAccountAsAdmin,
    joinFamilyAccountAsMember,
    getUserInfo,
    setUserAsFamilyAdmin,
    removeAdminStatusFromFamilyMember,
    createJoinCode,
    joinFamilyUsingCode,
    optInForDinner,
    optOutForDinner,
    getUserDinnerAttendances,
    getDinnerDetails,
    startDinner
};