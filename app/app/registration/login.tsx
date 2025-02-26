import { ReactElement, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '@/components/form/Input';
import RegistrationHeader from '@/components/registration/RegistrationHeader';
import Form from '@/components/form/Form';
import { userLogin } from '@/methods/userManagement/login';
import SafeContainer from '@/components/form/SafeContainer';

export default function LoginScreen(): ReactElement {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login(): Promise<void> {
        await userLogin(email, password);
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
                buttonText="Login"
                onPress={login}
            >
                <Input
                    input={[email, setEmail]}
                    label="Email"
                    type="emailAddress"
                    autoComplete="email"
                />

                <Input
                    input={[password, setPassword]}
                    label="Password"
                    marginTop={true}
                    type="password"
                    autoComplete="current-password"
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