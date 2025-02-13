import { ReactElement } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "./welcome";
import LoginScreen from "./login";

const Stack = createNativeStackNavigator();

export default function RegistrationStack(): ReactElement {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="welcome" component={WelcomeScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
        </Stack.Navigator>
    );
}