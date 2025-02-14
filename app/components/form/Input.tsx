import { ReactElement, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Input(props: any): ReactElement {

    const [input, setInput] = props.input;

    return (
        <View style={styles.container}>
            <Text
                style={[styles.label, styles.shadow, {
                    marginTop: props.marginTop ? 20 : 0
                }]}
            >
                { props.label }
            </Text>
            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder={props.placeholder}
                style={[styles.input, styles.shadow]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    label: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: '500'
    },
    input: {
        width: '100%',
        height: 50,
        marginTop: 3,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        paddingHorizontal: 8,
        fontSize: 16
    },
    shadow: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5
    }
});