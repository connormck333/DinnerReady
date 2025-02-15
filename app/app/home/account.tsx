import { ReactElement, useRef } from "react";
import { View, StyleSheet, Text, Dimensions, Image, FlatList, TouchableOpacity, Animated } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LoweringContainer from "@/components/animations/LoweringContainer";
import { LowerContainerRef } from "@/methods/utils/interfaces";
import SharedHeader from "@/components/SharedHeader";

const { height } = Dimensions.get("window");

export default function AccountScreen(): ReactElement {

    const loweringContainerRef = useRef<LowerContainerRef>(null);

    function closeModal(): void {
        loweringContainerRef.current?.closeScreen();
    }

    return (
        <Animated.View>
            <LoweringContainer
                ref={loweringContainerRef}
                style={styles.container}
            >
                <FlatList
                    data={[1,2,3,4]}
                    numColumns={2}
                    style={styles.list}
                    ListHeaderComponent={<SharedHeader goBack={closeModal} />}
                    renderItem={({ item, index }) => (
                        <View style={[styles.item, {
                            marginTop: index > 1 ? 20 : 0
                        }]}>
                            <Image
                                source={{ uri: "https://preview.redd.it/looking-for-opponents-for-marge-simpson-the-simpsons-for-a-v0-vcvx5mj6mypa1.jpg?width=1080&crop=smart&auto=webp&s=d7fd5a47b79f23e32f5941a3a685366a42c9bdf5" }}
                                style={styles.avatar}
                                resizeMode="cover"
                            />
                            <Text style={styles.nameText}>Marge</Text>
                        </View>
                    )}
                    ListFooterComponent={<Footer />}
                />
            </LoweringContainer>
        </Animated.View>
    );
}

function Footer(props: any): ReactElement {
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={[styles.btn, styles.inviteBtn, styles.center]}>
                <MaterialIcons name="mail" size={24} color="#fff" />
                <Text style={styles.btnText}>Invite</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.manageBtn, styles.center]}>
                <MaterialIcons name="settings" size={24} color="#fff" />
                <Text style={styles.btnText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height - 200,
        backgroundColor: '#1bb100',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'absolute',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 10
    },
    list: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10
    },
    item: {
        width: '50%',
        alignItems: 'center'
    },
    avatar: {
        height: 110,
        width: 110,
        borderRadius: 55
    },
    nameText: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 5
    },
    footer: {
        marginTop: 40,
        alignItems: 'center'
    },
    btn: {
        width: '80%',
        paddingVertical: 15,
        backgroundColor: '#005C00',
        borderRadius: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inviteBtn: {
        backgroundColor: '#005C00',
        borderColor: '#003c00'
    },
    manageBtn: {
        marginTop: 15,
        backgroundColor: '#0B9212',
        borderColor: '#0c7f13'
    },
    btnText: {
        fontSize: 20,
        color: '#ebebeb',
        fontWeight: '500',
        marginLeft: 5
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});