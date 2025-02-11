import { Stack } from "expo-router";

export default function CalendarStack() {
    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="index" />
        </Stack>
    );
}