import { ReactElement } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import LinearBackground from "@/components/LinearBackground";

export default function WelcomeScreen(props: any): ReactElement {

    const { navigation } = props;

    function goToLoginScreen(): void {
        navigation.navigate("login");
    }

    return (
        <LinearBackground
            style={styles.center}
        >

            <View style={[styles.circle, styles.center]}>
                <Image
                    source={require("@/assets/images/Logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={[styles.marginTopLarge, styles.center, styles.fullWidth]}>

                <TouchableOpacity
                    style={[styles.btn, styles.createBtn, styles.center]}
                >
                    <Text style={styles.btnText}>Create family account</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, styles.joinBtn, styles.center, styles.marginTopSmall]}
                >
                    <Text style={[styles.btnText, styles.textDark]}>Join family account</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.loginBtn, styles.marginTopSmall]}
                    onPress={goToLoginScreen}
                >
                    <Text style={styles.loginBtnText}>Login</Text>
                </TouchableOpacity>

            </View>

        </LinearBackground>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: '#dced5f',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.14,
        shadowRadius: 5
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    dinnerPlateImg: {
        height: 100,
        width: 100
    },
    marginTopLarge: {
        marginTop: 80
    },
    marginTopSmall: {
        marginTop: 20
    },
    fullWidth: {
        width: '100%'
    },
    logo: {
        width: 300
    },
    btn: {
        width: '80%',
        paddingVertical: 20,
        borderRadius: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.14,
        shadowRadius: 5
    },
    createBtn: {
        backgroundColor: '#005C00'
    },
    joinBtn: {
        backgroundColor: '#20D400'
    },
    btnText: {
        fontSize: 19,
        fontWeight: '600',
        color: '#EEEEEE'
    },
    textDark: {
        color: '#222222'
    },
    loginBtn: {
        padding: 10,
        paddingTop: 0
    },
    loginBtnText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#222',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.14,
        shadowRadius: 5
    }
});