import { ReactElement } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function SubmitButton(props: any): ReactElement {

    return (
        <TouchableOpacity
            style={[styles.container, {
                marginTop: props.marginTop ? 40 : 0
            }]}
        >
            <Text style={styles.text}>{ props.text }</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#1bb100',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.14,
        shadowRadius: 5
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#eee'
    }
});