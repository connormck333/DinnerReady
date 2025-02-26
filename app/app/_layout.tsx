import { ReactElement, useState, useEffect } from "react";
import { StyleSheet, Dimensions, View, StyleProp, ViewStyle } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import RegistrationStack from "./registration/navigator";
import HomeStack from "./home/navigator";
import CalendarStack from "./calendar/navigator";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/methods/firebase";
import { Status, User, UserContextType } from "@/methods/utils/interfaces";
import { getUserDetails } from "@/methods/userManagement/getUserDetails";
import UserContext from "@/methods/context/userContext";
import { getFamilyMembersAvatars } from "@/methods/familyManagement/getFamilyMembersAvatars";
import { getFocusedRouteNameFromRoute, Route } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

export default function TabLayout(): ReactElement {

    const [signedIn, setSignedIn] = useState<boolean | undefined>(undefined);
    const [signedInUser, setSignedInUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        (() => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const authToken = await user.getIdToken();
                    const response: Status = await getUserDetails(user.email as string, authToken);
        
                    setSignedIn(true);
                    if (response.success) {
                        const userDetails: User = response.response;
                        setSignedInUser(userDetails);
                        loadAvatars(userDetails);
                        return;
                    }
                } else {
                    setSignedIn(false);
                    setSignedInUser(undefined);
                }
            }, () => {
                setSignedIn(false);
                setSignedInUser(undefined);
            });
        })();
    }, []);

    async function loadAvatars(userDetails: User): Promise<void> {
        if (userDetails.familyData) {
            const familyMembers: User[] = [userDetails, ...userDetails.familyData.members as []];

            const urls: string[] = await getFamilyMembersAvatars(familyMembers);
            userDetails.avatarUrl = urls[0];
            for (let i = 1; i < urls.length; i++) {
                userDetails.familyData.members[i - 1].avatarUrl = urls[i];
            }

            setSignedInUser({...userDetails});
        }
    }

    return (
        <UserContext.Provider value={[signedInUser, setSignedInUser] as UserContextType}>
            { signedIn === undefined ?
                <View />
                :
                <>
                    {!signedIn || (signedIn && !signedInUser?.hasCompletedOnboarding) ?
                        <RegistrationStack
                            signedIn={[signedIn, setSignedIn]}
                            hasCompletedOnboarding={signedInUser?.hasCompletedOnboarding}
                        />
                        :
                        <TabNavigator />
                    }
                </>
            }
        </UserContext.Provider>
    );
}

function TabNavigator(): ReactElement {

    const tabHiddenScreens = ["change_password", "edit_profile", "join_new_family"];

    function isTabVisible(route: Route<string>): StyleProp<ViewStyle> {
        const routeName = getFocusedRouteNameFromRoute(route);
    
        if (routeName === undefined) {
            return styles.tabBar
        }
    
        return tabHiddenScreens.includes(routeName) ? styles.tabBarHidden : styles.tabBar
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: isTabVisible(route),
                tabBarLabelStyle: styles.tabBarLabel,
                headerShown: false
            })}
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
    tabBarHidden: {
        display: "none"
    },
    tabBarLabel: {
        fontSize: 14,
        marginTop: 5
    }
});