import { ReactElement } from "react";
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from "react-native";

export default function SubmitButton(props: any): ReactElement {

    return (
        <TouchableOpacity
            onPress={() => props.onPress()}
            style={[styles.container, {
                marginTop: props.marginTop ? 40 : 0
            }]}
        >
            { props.loading ?
                <ActivityIndicator size="small" color="#fff" />
                :
                <Text style={styles.text}>{ props.text }</Text>
            }
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