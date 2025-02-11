import { StyleSheet, Dimensions } from "react-native";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get("window");

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                headerShown: false
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="silverware-fork-knife" size={30} color={color} />,
                }}
            />
        </Tabs>
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
        shadowOpacity: 0.14,
        shadowRadius: 8
    },
    tabBarLabel: {
        fontSize: 14,
        marginTop: 5
    }
});