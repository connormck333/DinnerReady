import { ReactElement } from "react";
import { View, Image, StyleSheet } from "react-native";
import HeaderButton from "../buttons/HeaderButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function RegistrationHeader(props: any): ReactElement {

    const navigation = useNavigation();

    function goBack(): void {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            { props.headerButton === false ?
                <View style={styles.invis} />
                :
                <HeaderButton
                    icon={<MaterialCommunityIcons name="chevron-left" size={24} color="black" />}
                    color="rgba(22, 141, 0, 0.3)"
                    onPress={goBack}
                />
            }
            <Image
                source={require("../../assets/images/Logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.invis} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 40,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    logo: {
        width: 150,
        height: 100
    },
    invis: {
        width: 45,
        height: 45,
        backgroundColor: 'transparent'
    },
});