import { ReactElement } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "./welcome";

const Stack = createNativeStackNavigator();

export default function RegistrationStack(): ReactElement {

    return (
        <Stack.Navigator>
            <Stack.Screen name="welcome" component={WelcomeScreen} />
        </Stack.Navigator>
    );
}