import AvatarInput from "@/components/form/Avatar";
import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import SharedHeader from "@/components/SharedHeader";
import UserContext from "@/methods/context/userContext";
import { saveUserAvatar } from "@/methods/registration/saveAvatar";
import { deleteUserAvatar } from "@/methods/userManagement/deleteUserAvatar";
import { getAvatarUrl } from "@/methods/userManagement/getAvatarUrl";
import { updateUserDetails } from "@/methods/userManagement/updateUserDetails";
import { isValidName } from "@/methods/utils/inputValidation";
import { Status, User, UserContextType } from "@/methods/utils/interfaces";
import { ReactElement, useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

export default function EditProfileScreen(props: any): ReactElement {

    const { navigation } = props;
    const [user, setUser] = useContext(UserContext) as UserContextType;
    const [avatar, setAvatar] = useState<string | undefined>(user.avatarUrl);
    const [firstName, setFirstname] = useState<string>(user.firstName);
    const [surname, setSurname] = useState<string>(user.lastName);
    const [email, setEmail] = useState<string>(user.email);

    function goBack(): void {
        navigation.goBack();
    }

    async function updateDetails(): Promise<void> {
        const newDetails: User = {
            ...user,
            firstName: firstName,
            lastName: surname
        }

        if (!isValidName(firstName)) {
            Alert.alert("Error", "Please enter a valid first name.");
            return;
        } else if (!isValidName(surname)) {
            Alert.alert("Error", "Please enter a valid last name.");
            return;
        }

        const response: Status = await updateUserDetails(newDetails);

        if (!response.success) {
            Alert.alert("Error", "There was an error updating your details, please try again later.");
            return;
        }

        if (avatar === undefined) {
            await deleteUserAvatar(user.email);
        } else {
            await saveUserAvatar(avatar, user.email);
        }

        Alert.alert("Details updated.");
        setUser({
            ...newDetails,
            avatarUrl: await getAvatarUrl(user.email)
        });
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
                buttonText="Save"
                onPress={updateDetails}
            >
                <AvatarInput
                    avatar={[avatar, setAvatar]}
                    containerStyle={styles.input}
                    deleteButton
                />

                <Input
                    input={[firstName, setFirstname]}
                    label="First Name"
                    style={styles.input}
                />

                <Input
                    input={[surname, setSurname]}
                    label="Last Name"
                    style={styles.input}
                />

                <Input
                    input={[email, setEmail]}
                    label="Email"
                    style={styles.input}
                    disabled
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