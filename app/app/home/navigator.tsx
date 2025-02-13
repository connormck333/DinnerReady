import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home';
import AccountScreen from './account';

const Stack = createNativeStackNavigator();

export default function HomeStack() {

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
        </Stack.Navigator>
    );
}