import { ReactElement, useContext, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import ModalContainer from "./ModalContainer";
import GeneralButton from "../buttons/GeneralButton";
import { RefreshContextType, Status, User, UserContextType } from "@/methods/utils/interfaces";
import UserContext from "@/methods/context/userContext";
import { setUserAsAdmin } from "@/methods/familyManagement/setUserAsAdmin";
import { removeMemberFromFamily } from "@/methods/familyManagement/removeMemberFromFamily";
import UserRefreshContext from "@/methods/context/userRefreshContext";
import { removeAdminStatusFromFamilyMember } from "@/methods/familyManagement/removeAdminStatusFromMember";

export default function ManageMemberModal(props: any): ReactElement {

    const selectedUser: User | undefined = props.selectedUser;
    const [userRefresher, setUserRefresher] = useContext(UserRefreshContext) as RefreshContextType;
    const [user] = useContext(UserContext) as UserContextType;
    const [visible, setVisible] = props.visible;
    const [adminLoading, setAdminLoading] = useState<boolean>(false);
    const [removingLoading, setRemovingLoading] = useState<boolean>(false);

    async function setUserAsFamilyAdmin(): Promise<void> {
        if (selectedUser?.admin) {
            removeAdminStatus();
            return;
        }

        setAdminLoading(true);

        const response: Status = await setUserAsAdmin(user.email, selectedUser?.email as string);

        setAdminLoading(false);

        if (!response.success) {
            Alert.alert("Error", "Could not change user's permissions. Please try again later.");
            return;
        }

        Alert.alert("Success", "Successfully made user an admin.");
        setVisible(false);
        setUserRefresher(!userRefresher);
    }

    async function removeAdminStatus(): Promise<void> {
        setAdminLoading(true);

        const response: Status = await removeAdminStatusFromFamilyMember(user.email, selectedUser?.email as string);

        setAdminLoading(false);

        if (!response.success) {
            Alert.alert("Error", "Could not change user's permissions. Please try again later.");
            return;
        }

        Alert.alert("Success", "Successfully removed user's admin permissions.");
        setVisible(false);
        setUserRefresher(!userRefresher);
    }

    async function removeFromFamily(): Promise<void> {
        setRemovingLoading(true);

        const response: Status = await removeMemberFromFamily(user.email, selectedUser?.email as string);

        setRemovingLoading(false);

        if (!response.success) {
            Alert.alert("Error", "Could not change remove user. Please try again later.");
            return;
        }

        Alert.alert("Success", "User has been removed from your family account");
        setVisible(false);
        setUserRefresher(!userRefresher);
    }

    return (
        <ModalContainer
            visible={props.visible}
        >
            <Text style={styles.title}>{ selectedUser?.firstName } { selectedUser?.lastName }</Text>
            
            <View style={styles.btnContainer}>
                <GeneralButton
                    text={selectedUser?.admin ? "Remove Admin Status" : "Make Admin"}
                    style={{marginTop: 15}}
                    onPress={setUserAsFamilyAdmin}
                    loading={adminLoading}
                    disabled={adminLoading || removingLoading}
                />

                <GeneralButton
                    text="Remove from Family"
                    style={{marginTop: 15, backgroundColor: '#cb4038'}}
                    onPress={removeFromFamily}
                    loading={removingLoading}
                    disabled={adminLoading || removingLoading}
                />
            </View>
        </ModalContainer>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: '500'
    },
    btnContainer: {
        width: '100%',
        paddingHorizontal: 10
    }
});