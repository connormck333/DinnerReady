import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InfoBox from "./InfoBox";
import { useContext } from "react";
import UserContext from "@/methods/context/userContext";
import { UserContextType } from "@/methods/utils/interfaces";

export default function ResponseBox(props: any) {

    const [user, setUser] = useContext(UserContext) as UserContextType;

    return (
        <InfoBox containerStyle={styles.column}>
            <FlatList
                data={[user, ...user.familyData?.members as []]}
                scrollEnabled={false}
                keyExtractor={(item) => item.email}
                renderItem={({ item, index }) => (
                    <View style={[styles.row, {
                        marginTop: index === 0 ? 0 : 15
                    }]}>
                        <View style={[styles.w75, styles.row]}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: item.avatarUrl }}
                                resizeMode="cover"
                            />
                            <View style={[styles.column, styles.textContainer]}>
                                <Text style={styles.headerText}>{ item.firstName } { item.lastName }</Text>
                                <Text style={styles.infoText}>Attending</Text>
                            </View>
                        </View>
                        <View style={[styles.w25, styles.flexEnd]}>
                            <MaterialIcons name="check-circle-outline" size={35} color="#068c00" />
                        </View>
                    </View>
                )}
            />
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