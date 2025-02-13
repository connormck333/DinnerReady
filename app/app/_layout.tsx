import { ReactElement, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import RegistrationStack from "./registration/navigator";
import HomeStack from "./home/navigator";
import CalendarStack from "./calendar/navigator";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

export default function TabLayout(): ReactElement {

    const [signedIn, setSignedIn] = useState(true);

    if (signedIn) {
        return <TabNavigator />
    }

    return <RegistrationStack />
}

function TabNavigator(): ReactElement {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                headerShown: false
            }}
        >
            <Tab.Screen
                name='index'
                component={HomeStack}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="silverware-fork-knife" size={30} color={color} />
                }}
            />
            <Tab.Screen
                name='calendar'
                component={CalendarStack}
                options={{
                    title: 'Calendar',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar" size={30} color={color} />
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 40,
        marginLeft: width / 5,
        width: '60%',
        borderRadius: 40,
        backgroundColor: '#eee',
        height: 65,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10
    },
    tabBarLabel: {
        fontSize: 14,
        marginTop: 5
    }
});