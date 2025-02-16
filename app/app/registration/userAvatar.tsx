import AvatarInput from '@/components/form/Avatar';
import Form from '@/components/form/Form';
import RegistrationHeader from '@/components/registration/RegistrationHeader';
import UserContext from '@/methods/context/userContext';
import { saveUserAvatar } from '@/methods/registration/saveAvatar';
import { Status, User, UserContextType } from '@/methods/utils/interfaces';
import { ReactElement, useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

export default function UserAvatarScreen(props: any): ReactElement {

    const { navigation, route } = props;
    const [user, setUser]: UserContextType = useContext(UserContext) as UserContextType;
    const [avatar, setAvatar] = useState<string | undefined>(undefined);

    async function saveAvatar(): Promise<void> {
        if (!avatar) {
            Alert.alert("Error", "Please select an avatar.");
            return;
        }
        const response: Status = await saveUserAvatar(avatar as string, user?.email === undefined ? route.params.email : user.email);

        if (!response.success) {
            Alert.alert("Error", "There was an error saving your profile picture. Please try again later.");
        } else {
            goToCreateFamilyScreen();
        }
    }

    function goToCreateFamilyScreen(): void {
        navigation.navigate("createFamily", {email: route.params?.email});
    }

    return (
        <View style={styles.container}>
            <RegistrationHeader headerButton={false} />

            <Form
                style={{marginTop: 30}}
                button={true}
                buttonText="Save"
                onPress={saveAvatar}
                secondButton={true}
                secondButtonText="Skip"
                secondButtonOnPress={goToCreateFamilyScreen}
            >
                <AvatarInput
                    label="Profile Picture"
                    avatar={[avatar, setAvatar]}
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