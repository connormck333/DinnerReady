import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import SharedHeader from "@/components/SharedHeader";
import UserContext from "@/methods/context/userContext";
import { joinNewFamilyByCode } from "@/methods/familyManagement/joinNewFamilyByCode";
import { Status, UserContextType } from "@/methods/utils/interfaces";
import { ReactElement, useContext, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

export default function JoinNewFamilyScreen(props: any): ReactElement {

    const { navigation } = props;
    const [user] = useContext(UserContext) as UserContextType;
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
                onPress={joinNewFamily}
            >
                <Input
                    input={[code, setCode]}
                    label="Join Code"
                    placeholder="Enter code here..."
                />
                <Text style={styles.info}>By joining a new family account, you will be leaving your current one. All attendance data will be lost.</Text>
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
    info: {
        fontSize: 14,
        color: '#666',
        marginTop: 20,
        textAlign: 'justify'
    }
});