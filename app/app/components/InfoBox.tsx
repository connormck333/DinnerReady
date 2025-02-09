import { View, StyleSheet, Text } from 'react-native';

export default function InfoBox(props: any) {

    return (
        <View style={styles.container}>
            { props.icon &&
                <View>{ props.icon }</View>
            }
            <View style={styles.column}>
                <Text style={styles.headerText}>{ props.headerText }</Text>
                <Text style={styles.infoText}>{ props.infoText }</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5,
        backgroundColor: '#f3f3f3',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.14,
        shadowRadius: 5
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600'
    },
    infoText: {
        fontSize: 15,
        fontWeight: '400'
    }
});