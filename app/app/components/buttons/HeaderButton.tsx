import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function HeaderButton(props: any) {
    return (
        <TouchableOpacity style={styles.container}>
            { props.icon }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: '#168d00',
        alignItems: 'center',
        justifyContent: 'center'
    }
});