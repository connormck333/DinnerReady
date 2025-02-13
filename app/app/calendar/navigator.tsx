import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from './calendar';

const Stack = createNativeStackNavigator();

export default function CalendarStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="index" component={CalendarScreen} />
        </Stack.Navigator>
    );
}