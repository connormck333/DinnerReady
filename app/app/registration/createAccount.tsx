import { ReactElement, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import RegistrationHeader from '@/components/registration/RegistrationHeader';
import Input from '@/components/form/Input';
import Form from '@/components/form/Form';
import { Status } from '@/methods/utils/interfaces';
import createNewUser from '@/methods/registration/createUser';
import { isValidName, isValidPassword } from '@/methods/utils/inputValidation';
import SafeContainer from '@/components/form/SafeContainer';

export default function CreateAccountScreen(props: any): ReactElement {

    const { navigation } = props;
    const [forename, setForename] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    async function createAccount(): Promise<void> {
        if (password !== passwordConfirm) {
            Alert.alert("Invalid Password", "Your passwords do not match!");
            return;
        }

        if (!isValidName(forename) || !isValidName(surname)) {
            Alert.alert("Invalid Name", "Your name must be between 2 and 25 characters long");
            return;
        } else if (!isValidPassword(password)) {
            Alert.alert("Invalid Password", "Your password must be longer than 7 characters and contain a special character");
            return;
        }

        const response: Status = await createNewUser({
            email: email,
            password: password,
            firstName: forename,
            lastName: surname
        });

        if (!response.success) {
            Alert.alert("Error", "There was an error creating your account. Please try again later.");
        } else {
            navigation.navigate("avatar", {email: email.toLowerCase()});
        }
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
                onPress={createAccount}
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
                    type="emailAddress"
                    autoComplete="email"
                />

                <Input
                    input={[password, setPassword]}
                    label="Password"
                    placeholder="***********"
                    marginTop
                    type="password"
                />

                <Input
                    input={[passwordConfirm, setPasswordConfirm]}
                    label="Confirm Password"
                    placeholder="***********"
                    marginTop
                    type="password"
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