import Form from '@/components/form/Form';
import Input from '@/components/form/Input';
import RegistrationHeader from '@/components/registration/RegistrationHeader';
import { ReactElement, useState } from 'react';
import { View, StyleSheet } from 'react-native';

export default function JoinFamilyAccountScreen(props: any): ReactElement {

    const [code, setCode] = useState<string>("");

    return (
        <View style={styles.container}>
            <RegistrationHeader />

            <Form
                style={{marginTop: 30}}
                button={true}
                buttonText="Join Family"
            >

                <Input
                    label="Join Code"
                    input={[code, setCode]}
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