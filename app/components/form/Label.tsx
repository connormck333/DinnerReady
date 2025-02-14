import { ReactElement } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Label(props: any): ReactElement {
    return (
        <Text
            style={[styles.label, styles.shadow, props.style]}
        >
            { props.label }
        </Text>
    );
}

const styles = StyleSheet.create({
    label: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: '500'
    },
    shadow: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5
    }
});