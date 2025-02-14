import { ReactElement } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function SecondaryButton(props: any): ReactElement {

    return (
        <TouchableOpacity style={props.containerStyle}>
            <Text style={styles.text}>{ props.text }</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0080ac'
    }
});