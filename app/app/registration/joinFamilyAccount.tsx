import Form from '@/components/form/Form';
import Input from '@/components/form/Input';
import RegistrationHeader from '@/components/registration/RegistrationHeader';
import UserContext from '@/methods/context/userContext';
import UserRefreshContext from '@/methods/context/userRefreshContext';
import { joinFamilyByCode } from '@/methods/familyManagement/joinFamilyByCode';
import { RefreshContextType, Status, UserContextType } from '@/methods/utils/interfaces';
import { ReactElement, useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

export default function JoinFamilyAccountScreen(props: any): ReactElement {

    const [userRefresher, setUserRefresher] = useContext(UserRefreshContext) as RefreshContextType;
    const [user] = useContext(UserContext) as UserContextType;
    const [code, setCode] = useState<string>("");

    async function joinFamily(): Promise<void> {
        if (code.length !== 8) {
            Alert.alert("Error", "Please enter a valid 8 digit code.");
            return;
        }

        const response: Status = await joinFamilyByCode(user.email, code);

        if (!response.success) {
            Alert.alert("Error", "The code you entered was invalid.");
            return;
        }

        setUserRefresher(!userRefresher);
    }

    return (
        <View style={styles.container}>
            <RegistrationHeader />

            <Form
                style={{marginTop: 30}}
                button={true}
                buttonText="Join Family"
                onPress={joinFamily}
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