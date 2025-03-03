import { deleteUserAvatar, getUserInfo, removeAdminStatusFromFamilyMember, saveUserDeviceToken, setUserAsFamilyAdmin, updateUserDetails } from "./src/triggers/account";
import { getDinnerDetails, getUserDinnerAttendances, optInForDinner, optOutForDinner, startDinner } from "./src/triggers/dinner";
import { createJoinCode, joinFamilyUsingCode, joinNewFamilyUsingCode, removeMemberFromFamily } from "./src/triggers/families";
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
    startDinner,
    deleteUserAvatar,
    updateUserDetails,
    joinNewFamilyUsingCode,
    removeMemberFromFamily,
    saveUserDeviceToken
};