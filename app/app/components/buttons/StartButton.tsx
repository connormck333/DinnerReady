import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function StartButton(props: any) {

    return (
        <View style={props.containerStyle}>
            <View style={[styles.largeCircle, styles.center]}>
                <View style={[styles.middleCircle, styles.center]}>
                    <TouchableOpacity
                        style={[styles.smallCircle, styles.center]}
                        activeOpacity={0.6}
                    >
                        <MaterialCommunityIcons name="bell" size={70} color="#002f09" />
                        <Text style={styles.text}>Send Reminders</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    largeCircle: {
        backgroundColor: '#00991F',
        width: 290,
        height: 290,
        borderRadius: 145,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.14,
        shadowRadius: 5
    },
    middleCircle: {
        backgroundColor: '#02A623',
        width: 250,
        height: 250,
        borderRadius: 125
    },
    smallCircle: {
        backgroundColor: '#02B927',
        width: 210,
        height: 210,
        borderRadius: 105
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 19,
        fontWeight: '600',
        color: '#fff',
        marginTop: 10
    }
});