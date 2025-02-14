import { ReactElement } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Label from './Label';

export default function AvatarInput(props: any): ReactElement {

    return (
        <View style={styles.container}>
            <Label label="Family Picture" />
            <TouchableOpacity style={styles.circle}>
                <Text style={styles.text}>Select</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.14,
        shadowRadius: 5,
        marginTop: 15
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#0080ac'
    }
});