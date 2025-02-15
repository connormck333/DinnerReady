import { ReactElement } from "react";
import { Image, StyleSheet, View } from "react-native";
import HeaderButton from "./buttons/HeaderButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function SharedHeader(props: any): ReactElement {
    return (
        <View style={styles.header}>
            <HeaderButton
                onPress={props.goBack}
                color={props.buttonColor}
                icon={<MaterialCommunityIcons name="window-close" size={24} color="black" />}
            />
            <Image
                source={require("@/assets/images/Logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.invis} />
        </View>
    )
}

const styles = StyleSheet.create({
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
    invis: {
        width: 45,
        height: 45,
        backgroundColor: 'transparent'
    },
});