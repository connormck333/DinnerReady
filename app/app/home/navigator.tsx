import { ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home';
import AccountScreen from './account';
import SettingsScreen from '../settings/settings';

const Stack = createNativeStackNavigator();

export default function HomeStack(): ReactElement {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="index" component={HomeScreen} />
            <Stack.Screen
                name="account"
                component={AccountScreen}
                options={{
                    presentation: "transparentModal",
                    animation: "none"
                }}
            />
            <Stack.Screen
                name="settings"
                component={SettingsScreen}
                options={{
                    presentation: "transparentModal",
                    animation: "none"
                }}
            />
        </Stack.Navigator>
    );
}