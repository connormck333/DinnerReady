import { View, StyleSheet, Image, Text } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InfoBox from "./InfoBox";

export default function ResponseBox(props: any) {

    const users = [1, 2, 3, 4 ,5, 6, 6, 7, 8];

    return (
        <InfoBox containerStyle={styles.column}>
            { users.map((item, index) => (
                <View style={[styles.row, {
                    marginTop: index === 0 ? 0 : 15
                }]}>
                    <View style={[styles.w75, styles.row]}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: 'https://i.pinimg.com/736x/1d/b9/18/1db918fe2b5dff69f35186ad20cc1752.jpg' }}
                            resizeMode="cover"
                        />
                        <View style={[styles.column, styles.textContainer]}>
                            <Text style={styles.headerText}>Connor McKenzie</Text>
                            <Text style={styles.infoText}>Attending</Text>
                        </View>
                    </View>
                    <View style={[styles.w25, styles.flexEnd]}>
                        <MaterialIcons name="check-circle-outline" size={35} color="#068c00" />
                    </View>
                </View>
            ))}
        </InfoBox>
    );
}

const styles = StyleSheet.create({
    w25: {
        width: '25%'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    w75: {
        width: '75%'
    },
    flexEnd: {
        alignItems: 'flex-end'
    },
    textContainer: {
        marginLeft: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600'
    },
    infoText: {
        fontSize: 15,
        fontWeight: '400',
        color: '#068c00'
    }
});