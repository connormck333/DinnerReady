import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ReactElement, useContext, useState } from "react";
import UserContext from "@/methods/context/userContext";
import { UserContextType } from "@/methods/utils/interfaces";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CalendarEventModal from "../modals/CalendarEventModal";

export default function StartButton(props: any): ReactElement {

    const [user] = useContext(UserContext) as UserContextType;
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <View style={props.containerStyle}>
            <CalendarEventModal
                visible={[modalOpen, setModalOpen]}
                date={new Date(Date.now())}
                callback={props.callback}
            />
            <View style={[styles.largeCircle, styles.center]}>
                <View style={[styles.middleCircle, styles.center]}>
                    <TouchableOpacity
                        style={[styles.smallCircle, styles.center]}
                        activeOpacity={0.6}
                        onPress={() => setModalOpen(true)}
                    >
                        { user.admin ?
                            <View style={styles.center}>
                                <MaterialCommunityIcons name="bell" size={70} color="#002f09" />
                                <Text style={styles.text}>Send Reminders</Text>
                            </View>
                            :
                            <UserButton
                                attending={props.attending}
                            />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

function UserButton(props: any): ReactElement {

    if (props.attending) {
        return (
            <View style={styles.center}>
                <MaterialIcons name="check-circle" size={80} color="#002f09" />
                <Text style={styles.text}>Attending</Text>
            </View>
        );
    } else if (props.attending === false) {
        return (
            <View style={styles.center}>
                <MaterialCommunityIcons name="close-circle" size={80} color="#002f09" />
                <Text style={styles.text}>Not Attending</Text>
            </View>
        );
    }

    return (
        <View style={styles.center}>
            <MaterialCommunityIcons name="alert-circle-outline" size={80} color="#002f09" />
            <Text style={styles.text}>Set Attendance</Text>
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
        color: '#002f09',
        marginTop: 10
    }
});