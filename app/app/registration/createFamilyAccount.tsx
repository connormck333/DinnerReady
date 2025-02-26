import AvatarInput from "@/components/form/Avatar";
import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import SafeContainer from "@/components/form/SafeContainer";
import RegistrationHeader from "@/components/registration/RegistrationHeader";
import UserContext from "@/methods/context/userContext";
import UserRefreshContext from "@/methods/context/userRefreshContext";
import { createFamilyAccount } from "@/methods/registration/createFamily";
import { saveFamilyAvatar } from "@/methods/registration/saveAvatar";
import { isValidName } from "@/methods/utils/inputValidation";
import { RefreshContextType, Status, UserContextType } from "@/methods/utils/interfaces";
import { ReactElement, useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

export default function CreateFamilyAccountScreen(props: any): ReactElement {

    const { navigation, route } = props;
    const [userRefresher, setUserRefresher] = useContext(UserRefreshContext) as RefreshContextType;
    const [user]: UserContextType = useContext(UserContext) as UserContextType;
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

        setUserRefresher(!userRefresher);
    }

    function joinFamily(): void {
        navigation.navigate("joinFamily", {email: route.params?.email});
    }

    return (
        <SafeContainer
            containerStyle={styles.container}
            backgroundColor='#e9ffe5'
        >
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
        </SafeContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#e9ffe5'
    }
});