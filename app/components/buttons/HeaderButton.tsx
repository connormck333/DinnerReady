import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function HeaderButton(props: any) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.container, {
                backgroundColor: props.color ? props.color : '#168d00'
            }]}
        >
            { props.icon }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 45,
        height: 45,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center'
    }
});