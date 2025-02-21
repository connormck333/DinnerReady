import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import SharedHeader from "@/components/SharedHeader";
import UserContext from "@/methods/context/userContext";
import { changePassword } from "@/methods/userManagement/changePassword";
import { Status, UserContextType } from "@/methods/utils/interfaces";
import { ReactElement, useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

export default function ChangePasswordScreen(props: any): ReactElement {

    const { navigation } = props;
    const [user] = useContext(UserContext) as UserContextType;
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    function goBack(): void {
        navigation.goBack();
    }

    async function changeUserPassword(): Promise<void> {
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Your passwords do not match!");
            return;
        }

        setLoading(true);

        const response: Status = await changePassword(user.email, currentPassword, newPassword);

        setLoading(false);

        if (!response.success) {
            Alert.alert("Error", "There was an error changing your password. Please try again later.");
            return;
        }

        Alert.alert("Password changed");
        goBack();
    }

    return (
        <View style={styles.container}>
            <SharedHeader
                buttonColor="rgba(22, 141, 0, 0.3)"
                goBack={goBack}
            />

            <Form
                style={{ marginTop: 30 }}
                button={true}
                buttonText="Change Password"
                onPress={changeUserPassword}
            >
                <Input
                    input={[currentPassword, setCurrentPassword]}
                    label="Current Password"
                    placeholder="********"
                    style={styles.input}
                    type="password"
                />

                <Input
                    input={[newPassword, setNewPassword]}
                    label="New Password"
                    placeholder="********"
                    style={styles.input}
                    type="password"
                />

                <Input
                    input={[confirmPassword, setConfirmPassword]}
                    label="Confirm New Password"
                    placeholder="********"
                    style={styles.input}
                    type="password"
                />
            </Form>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e9ffe5'
    },
    input: {
        marginBottom: 20
    }
});