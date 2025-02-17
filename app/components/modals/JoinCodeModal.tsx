import { ReactElement } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';
import ModalContainer from './ModalContainer';

export default function JoinCodeModal(props: any): ReactElement {

    async function copyCode(): Promise<void> {
        await Clipboard.setStringAsync(props.code);
    }

    return (
        <ModalContainer
            visible={props.visible}
        >
            <Text style={styles.title}>Join Code</Text>
            <View style={styles.codeContainer}>
                <Text style={styles.code}>{ props.code }</Text>
                <TouchableOpacity onPress={copyCode}>
                    <MaterialIcons name="content-copy" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={styles.infoText}>Copy this code and send to your family!</Text>
        </ModalContainer>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: '600'
    },
    code: {
        fontSize: 33,
        fontWeight: '500',
        color: '#0151c4',
        marginTop: 10,
        letterSpacing: 5,
        marginRight: 5,
        marginLeft: 29 
    },
    infoText: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginTop: 20
    },
    center: {
        width: '100%',
        alignItems: 'center'
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});