import { View, StyleSheet, Image, ScrollView } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GreenOverlay from "../../components/GreenOverlay";
import HeaderButton from "../../components/buttons/HeaderButton";
import StartButton from "../../components/buttons/StartButton";
import ResponseBox from "../../components/boxes/ResponseBox";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Status, UserContextType } from "@/methods/utils/interfaces";
import { getCurrentDinner } from "@/methods/dinnerManagement/getCurrentDinner";
import UserContext from "@/methods/context/userContext";
import { getAvatarUrl } from "@/methods/userManagement/getAvatarUrl";

export default function HomeScreen(props: any): ReactElement {

    const { navigation } = props;
    const [user, setUser] = useContext(UserContext) as UserContextType;
    const [currentDinner, setCurrentDinner] = useState<any>({attendance: []});
    const [avatars, setAvatars] = useState<Map<string, string>>(new Map());

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        (() => {
            loadCurrentDinner();
        })();
    }, []);

    async function loadCurrentDinner(): Promise<void> {
        const response: Status = await getCurrentDinner(user.email);
        console.log(response);
        if (!response.success) {
            setError(true);
        } else {
            const userAvatars: Map<string, string> = new Map();
            for (let user of response.response.attendance) {
                const avatarUrl: string = await getAvatarUrl(user.user.email);
                userAvatars.set(user.user.email, avatarUrl);
            }
            setAvatars(userAvatars);
            setCurrentDinner(response.response);
        }

        setLoading(false);
    }

    function openAccountScreen(): void {
        navigation.navigate("account");
    }

    function openSettingsScreen(): void {
        navigation.navigate("settings");
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{paddingBottom: 100}}
        >
            <GreenOverlay>
                <View style={styles.header}>
                    <HeaderButton
                        onPress={openAccountScreen}
                        icon={<MaterialCommunityIcons name="account-multiple" size={24} color="black" />}
                    />
                    <Image
                        source={require("@/assets/images/Logo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <HeaderButton
                        onPress={openSettingsScreen}
                        icon={<MaterialIcons name="settings" size={24} color="black" />}
                    />
                </View>
                <StartButton containerStyle={styles.startButtonContainer} />
            </GreenOverlay>

            <View style={styles.infoContainer}>
                <ResponseBox
                    data={currentDinner.attendance}
                    avatars={avatars}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        width: '100%',
        paddingTop: 40,
        paddingHorizontal: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    logo: {
        width: 130,
        height: 100
    },
    startButtonContainer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: -50
    },
    infoContainer: {
        width: '100%',
        padding: 20,
        paddingTop: 60
    }
});