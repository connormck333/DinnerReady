import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Image, FlatList, TouchableOpacity, Animated, Alert } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LoweringContainer from "@/components/animations/LoweringContainer";
import { LowerContainerRef, Status, UserContextType } from "@/methods/utils/interfaces";
import SharedHeader from "@/components/SharedHeader";
import { createJoinCode } from "@/methods/familyManagement/createJoinCode";
import UserContext from "@/methods/context/userContext";
import JoinCodeModal from "@/components/modals/JoinCodeModal";
import { DEFAULT_AVATAR_URL, getFamilyAvatarUrl } from "@/methods/userManagement/getAvatarUrl";

const { height } = Dimensions.get("window");

export default function AccountScreen(): ReactElement {

    const [user, setUser] = useContext(UserContext) as UserContextType;
    const [code, setCode] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const loweringContainerRef = useRef<LowerContainerRef>(null);

    function closeModal(): void {
        loweringContainerRef.current?.closeScreen();
    }

    async function createNewJoinCode(): Promise<void> {
        const response: Status = await createJoinCode(user.email);
        if (!response.success) {
            Alert.alert("Error", "There was an error creating a join code. Please try again later.");
            return;
        }

        setCode(response.response.code);
        setModalOpen(true);
    }

    return (
        <Animated.View>
            <JoinCodeModal
                visible={[modalOpen, setModalOpen]}
                code={code}
            />
            <LoweringContainer
                ref={loweringContainerRef}
                style={styles.container}
            >
                <FlatList
                    data={[user, ...user.familyData?.members as []]}
                    numColumns={2}
                    style={styles.list}
                    ListHeaderComponent={
                        <SharedHeader
                            rightButton={<FamilyImage familyId={user.familyData?.familyId} />}
                            goBack={closeModal}
                        />
                    }
                    renderItem={({ item, index }) => (
                        <View style={[styles.item, {
                            marginTop: index > 1 ? 20 : 0
                        }]}>
                            <Image
                                source={{ uri: item.avatarUrl  }}
                                style={styles.avatar}
                                resizeMode="cover"
                            />
                            <Text style={styles.nameText}>{ item?.firstName } { item.lastName }</Text>
                        </View>
                    )}
                    ListFooterComponent={user.admin ? <Footer createNewJoinCode={createNewJoinCode} /> : <View />}
                />
            </LoweringContainer>
        </Animated.View>
    );
}

function Footer(props: any): ReactElement {

    return (
        <View style={styles.footer}>
            <TouchableOpacity
                onPress={props.createNewJoinCode}
                style={[styles.btn, styles.inviteBtn, styles.center]}
            >
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

function FamilyImage(props: any): ReactElement {

    const [imageUrl, setImageUrl] = useState<string>(DEFAULT_AVATAR_URL);

    useEffect(() => {
        (() => {
            loadImageUrl();
        })();
    }, []);

    async function loadImageUrl(): Promise<void> {
        const url: string = await getFamilyAvatarUrl(props.familyId);
        setImageUrl(url);
    }

    return (
        <Image
            source={{ uri: imageUrl }}
            style={styles.familyImg}
            resizeMode="cover"
        />
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
        marginTop: 5,
        width: '85%',
        textAlign: 'center'
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
    },
    familyImg: {
        width: 45,
        height: 45,
        borderRadius: 22.5
    }
});