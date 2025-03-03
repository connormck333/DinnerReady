import { ReactElement } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "./welcome";
import LoginScreen from "./login";
import CreateAccountScreen from "./createAccount";
import CreateFamilyAccountScreen from "./createFamilyAccount";
import UserAvatarScreen from "./userAvatar";
import JoinFamilyAccountScreen from "./joinFamilyAccount";

const Stack = createNativeStackNavigator();

export default function RegistrationStack(props: any): ReactElement {

    const { hasCompletedOnboarding } = props;
    const signedIn = props.signedIn;

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={signedIn && !hasCompletedOnboarding ? "avatar" : "welcome"}
        >
            <Stack.Screen name="welcome" component={WelcomeScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="createAccount" component={CreateAccountScreen} />
            <Stack.Screen name="createFamily">
                { props => <CreateFamilyAccountScreen {...props} /> }
            </Stack.Screen>
            <Stack.Screen name="joinFamily">
                { props => <JoinFamilyAccountScreen {...props} /> }
            </Stack.Screen>
            <Stack.Screen name="avatar" component={UserAvatarScreen} />
        </Stack.Navigator>
    );
}