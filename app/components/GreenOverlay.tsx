import { View, StyleSheet } from "react-native";

export default function GreenOverlay(props: any) {

    return (
        <View style={[styles.container, props.style, {
            height: props.height ? props.height : 400
        }]}>
            { props.children }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#1bb100',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.14,
        shadowRadius: 5,
        borderRadius: 10
    }
});