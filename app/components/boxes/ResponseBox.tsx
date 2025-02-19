import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InfoBox from "./InfoBox";
import { ReactElement } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const RED = '#cb4038';
const GRAY = '#888';
const GREEN = '#068c00';

export default function ResponseBox(props: any): ReactElement {

    const avatars: Map<string, string> = props.avatars;

    return (
        <InfoBox containerStyle={styles.column}>
            <FlatList
                data={props.data}
                scrollEnabled={false}
                keyExtractor={(item) => item.email}
                renderItem={({ item, index }) => (
                    <View style={[styles.row, {
                        marginTop: index === 0 ? 0 : 15
                    }]}>
                        <View style={[styles.w75, styles.row]}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: avatars.get(item.user.email) }}
                                resizeMode="cover"
                            />
                            <View style={[styles.column, styles.textContainer]}>
                                <Text style={styles.headerText}>{ item.user.firstName } { item.user.lastName }</Text>
                                <Text style={[styles.infoText, {
                                    color: item.attending ? GREEN : (item.attending === false ? RED : GRAY)
                                }]}>{ item.attending ? "Attending" : (item.attending === false ? "Not Attending" : "No Response") }</Text>
                            </View>
                        </View>
                        <AttendingStatus attending={item.attending} />
                    </View>
                )}
            />
        </InfoBox>
    );
}

function AttendingStatus(props: any): ReactElement {

    if (props.attending === true) {
        return (
            <View style={[styles.w25, styles.flexEnd]}>
                <MaterialIcons name="check-circle-outline" size={35} color={GREEN} />
            </View>
        );
    } else if (props.attending === false) {
        return (
            <View style={[styles.w25, styles.flexEnd]}>
                <MaterialCommunityIcons name="close-circle" size={35} color={RED} />
            </View>
        );
    }

    return (
        <View style={[styles.w25, styles.flexEnd]}>
            <MaterialCommunityIcons name="alert-circle-outline" size={35} color={GRAY} />
        </View>
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
        fontWeight: '400'
    }
});