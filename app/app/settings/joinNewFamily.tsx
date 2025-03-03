import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import SafeContainer from "@/components/form/SafeContainer";
import SharedHeader from "@/components/SharedHeader";
import UserContext from "@/methods/context/userContext";
import UserRefreshContext from "@/methods/context/userRefreshContext";
import { joinNewFamilyByCode } from "@/methods/familyManagement/joinNewFamilyByCode";
import { RefreshContextType, Status, UserContextType } from "@/methods/utils/interfaces";
import { ReactElement, useContext, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

export default function JoinNewFamilyScreen(props: any): ReactElement {

    const { navigation } = props;
    const [userRefresher, setUserRefresher] = useContext(UserRefreshContext) as RefreshContextType;
    const [user, setUser] = useContext(UserContext) as UserContextType;
    const [code, setCode] = useState<string>("");

    function goBack(): void {
        navigation.goBack();
    }

    async function joinNewFamily(): Promise<void> {
        if (code.length != 8) {
            Alert.alert("Error", "Please enter a valid code.");
            return;
        }

        const response: Status = await joinNewFamilyByCode(user.email, code);

        if (!response.success) {
            Alert.alert("Error", "There was an error joining new family account. Please try again later.");
            return;
        }

        Alert.alert("Success", "You have joined a new family account!");
        setUserRefresher(!userRefresher);
    }

    return (
        <SafeContainer
            containerStyle={styles.container}
            backgroundColor='#e9ffe5'
        >
            <SharedHeader
                buttonColor="rgba(22, 141, 0, 0.3)"
                goBack={goBack}
            />

            <Form
                style={{ marginTop: 30 }}
                button={true}
                buttonText="Save"
                onPress={joinNewFamily}
            >
                <Input
                    input={[code, setCode]}
                    label="Join Code"
                    placeholder="Enter code here..."
                />
                <Text style={styles.info}>By joining a new family account, you will be leaving your current one. All attendance data will be lost.</Text>
            </Form>
        </SafeContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#e9ffe5'
    },
    info: {
        fontSize: 14,
        color: '#666',
        marginTop: 20,
        textAlign: 'justify'
    }
});