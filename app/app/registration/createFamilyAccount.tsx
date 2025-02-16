import AvatarInput from "@/components/form/Avatar";
import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import RegistrationHeader from "@/components/registration/RegistrationHeader";
import UserContext from "@/methods/context/userContext";
import { auth } from "@/methods/firebase";
import { createFamilyAccount } from "@/methods/registration/createFamily";
import { saveFamilyAvatar } from "@/methods/registration/saveAvatar";
import { getUserDetails } from "@/methods/userManagement/getUserDetails";
import { isValidName } from "@/methods/utils/inputValidation";
import { Status, User, UserContextType } from "@/methods/utils/interfaces";
import { ReactElement, useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

export default function CreateFamilyAccountScreen(props: any): ReactElement {

    const { navigation, route, setSignedIn } = props;
    const [user, setUser]: UserContextType = useContext(UserContext) as UserContextType;
    const [avatar, setAvatar] = useState<string | undefined>(undefined);
    const [familyName, setFamilyName] = useState<string>("");

    async function createFamily(): Promise<void> {
        if (!isValidName(familyName)) {
            Alert.alert("Invalid Name", "Your family name must be between 2 and 25 characters long.");
            return;
        }

        const email = user?.email === undefined ? route.params.email : user.email;
        const response: Status = await createFamilyAccount(email, familyName);
        console.log(email)

        if (!response.success) {
            Alert.alert("Error", "There was an error creating your family account. Please try again later.");
            return;
        }

        if (avatar) {
            const familyId: string = response.response.familyId;
            await saveFamilyAvatar(avatar, familyId);
        }

        setUser({
            ...user,
            hasCompletedOnboarding: true
        });
        setSignedIn(true);
    }

    function joinFamily(): void {
        navigation.navigate("joinFamily", {email: route.params?.email});
    }

    return (
        <View style={styles.container}>
            <RegistrationHeader />

            <Form
                style={{marginTop: 30}}
                button={true}
                buttonText="Create Account"
                onPress={createFamily}
                secondButton={true}
                secondButtonText="I have a code"
                secondButtonOnPress={joinFamily}
            >
                <AvatarInput
                    avatar={[avatar, setAvatar]}
                    label="Family Picture"
                />

                <Input
                    label="Family Nickname"
                    input={[familyName, setFamilyName]}
                    containerStyle={{marginTop: 40}}
                    placeholder="Enter nickname here..."
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
    }
});