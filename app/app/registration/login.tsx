import { ReactElement, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '@/components/form/Input';
import RegistrationHeader from '@/components/registration/RegistrationHeader';
import Form from '@/components/form/Form';

export default function LoginScreen(): ReactElement {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login(): void {
        
    }

    return (
        <View style={styles.container}>
            <RegistrationHeader />

            <Form
                style={{marginTop: 30}}
                button={true}
                buttonText="Login"
            >
                <Input
                    input={[email, setEmail]}
                    label="Email"
                />

                <Input
                    input={[password, setPassword]}
                    label="Password"
                    marginTop={true}
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