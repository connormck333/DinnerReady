import { View, StyleSheet, Text } from 'react-native';

export default function InfoBox(props: any) {

    return (
        <View style={[styles.container, props.containerStyle]}>
            { props.children }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: '#f3f3f3',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.14,
        shadowRadius: 5
    }
});