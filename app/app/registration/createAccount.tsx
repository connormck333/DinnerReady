import { ReactElement, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RegistrationHeader from '@/components/registration/RegistrationHeader';
import Input from '@/components/form/Input';
import Form from '@/components/form/Form';

export default function CreateAccountScreen(props: any): ReactElement {

    const { navigation } = props;
    const [forename, setForename] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    function goToCreateFamilyScreen(): void {
        navigation.navigate("createFamily");
    }

    return (
        <View style={styles.container}>
            <RegistrationHeader />

            <Form
                style={{marginTop: 30}}
                button={true}
                buttonText="Create Account"
                onPress={goToCreateFamilyScreen}
            >

                <Input
                    input={[forename, setForename]}
                    label="First Name"
                />

                <Input
                    input={[surname, setSurname]}
                    label="Last Name"
                    marginTop
                />

                <Input
                    input={[email, setEmail]}
                    label="Email"
                    marginTop
                />

                <Input
                    input={[password, setPassword]}
                    label="Password"
                    placeholder="***********"
                    marginTop
                />

                <Input
                    input={[passwordConfirm, setPasswordConfirm]}
                    label="Confirm Password"
                    placeholder="***********"
                    marginTop
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