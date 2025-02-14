import AvatarInput from "@/components/form/Avatar";
import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import RegistrationHeader from "@/components/registration/RegistrationHeader";
import { ReactElement, useState } from "react";
import { View, StyleSheet } from "react-native";

export default function CreateFamilyAccountScreen(): ReactElement {

    const [familyName, setFamilyName] = useState("");

    return (
        <View style={styles.container}>
            <RegistrationHeader />

            <Form
                style={{marginTop: 30}}
                button={true}
                buttonText="Create Account"
                secondButton={true}
                secondButtonText="I have a code"
            >
                <AvatarInput />

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