import { View, StyleSheet, Image, ScrollView } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import GreenOverlay from "../components/GreenOverlay";
import HeaderButton from "../components/buttons/HeaderButton";
import StartButton from "../components/buttons/StartButton";
import ResponseBox from "../components/boxes/ResponseBox";

export default function HomeScreen() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{paddingBottom: 100}}
        >
            <GreenOverlay>
                <View style={styles.header}>
                    <HeaderButton icon={<MaterialCommunityIcons name="account" size={24} color="black" />} />
                    <Image
                        source={require("../../assets/images/Logo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <HeaderButton />
                </View>
                <StartButton containerStyle={styles.startButtonContainer} />
            </GreenOverlay>

            <View style={styles.infoContainer}>
                <ResponseBox />
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
        width: 200,
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