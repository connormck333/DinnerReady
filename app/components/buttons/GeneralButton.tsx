import { ReactElement } from "react";
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from "react-native";

export default function GeneralButton(props: any): ReactElement {

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.container, props.style]}
            disabled={props.loading || props.disabled}
        >
            { props.loading ?
                <ActivityIndicator color="#fff" size="small" />
                :
                <Text style={styles.text}>{ props.text }</Text>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#1bb100',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.14,
        shadowRadius: 5
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: '#f4f4f4'
    }
});