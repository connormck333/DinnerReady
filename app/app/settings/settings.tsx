import { ReactElement, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LoweringContainer from '@/components/animations/LoweringContainer';
import SharedHeader from '@/components/SharedHeader';
import { LowerContainerRef } from '@/methods/utils/interfaces';
import { userLogout } from '@/methods/userManagement/logout';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function SettingsScreen(props: any): ReactElement {

    const { navigation } = props;
    const loweringContainerRef = useRef<LowerContainerRef>(null);

    function goBack(): void {
        loweringContainerRef.current?.closeScreen();
    }

    function changePassword(): void {
        navigation.replace("change_password");
    }

    return (
        <LoweringContainer
            ref={loweringContainerRef}
            style={styles.container}
        >
            <ScrollView>
                <SharedHeader
                    buttonColor="rgba(22, 141, 0, 0.3)"
                    goBack={goBack}
                />

                <View style={styles.body}>
                    <Option
                        icon={<MaterialCommunityIcons name="account-key" size={25} color="black" />}
                        text="Change Password"
                        onPress={changePassword}
                    />
                    <Option
                        icon={<MaterialIcons name="logout" size={25} color="black" />}
                        text="Log out"
                        onPress={userLogout}
                    />
                </View>
            </ScrollView>

        </LoweringContainer>
    );
}

function Option(props: any): ReactElement {

    return (
        <TouchableOpacity
            onPress={() => props.onPress()}
            style={styles.option}
        >
            <View style={styles.row}>
                { props.icon }
                <Text style={styles.optionText}>{ props.text }</Text>
            </View>

            <MaterialIcons name="chevron-right" size={30} color="black" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9ffe5'
    },
    body: {
        width: '100%',
        padding: 20
    },
    option: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 10
    }
});