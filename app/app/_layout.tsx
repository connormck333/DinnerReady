import { ReactElement, useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import RegistrationStack from "./registration/navigator";
import HomeStack from "./home/navigator";
import CalendarStack from "./calendar/navigator";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/methods/firebase";
import { Status } from "@/methods/utils/interfaces";
import { getUserDetails } from "@/methods/userManagement/getUserDetails";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

export default function TabLayout(): ReactElement {

    const [signedIn, setSignedIn] = useState<boolean | undefined>(undefined);
    const [signedInUser, setSignedInUser] = useState<any>(undefined);

    useEffect(() => {
        (() => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const authToken = await user.getIdToken();
                    const userDetails: Status = await getUserDetails(user.email as string, authToken);
        
                    if (userDetails.success) {
                        setSignedInUser(userDetails.response);
                        setSignedIn(true);
                        return;
                    }
                }
                setSignedIn(false);
            }, () => setSignedIn(false));
        })();
    }, []);

    if (signedIn === undefined) {
        return <View />
    } else if (!signedIn) {
        return <RegistrationStack />
    }

    return <TabNavigator />
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