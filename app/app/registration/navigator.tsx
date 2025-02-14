import { ReactElement } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "./welcome";
import LoginScreen from "./login";
import CreateAccountScreen from "./createAccount";
import CreateFamilyAccountScreen from "./createFamilyAccount";

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
            <Stack.Screen name="createAccount" component={CreateAccountScreen} />
            <Stack.Screen name="createFamily" component={CreateFamilyAccountScreen} />
        </Stack.Navigator>
    );
}