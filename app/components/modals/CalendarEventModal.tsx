import { View, Modal, StyleSheet, Text } from 'react-native';
import ModalContainer from './ModalContainer';
import GeneralButton from '../buttons/GeneralButton';

export default function CalendarEventModal(props: any) {

    const date = new Date(props.date);

    return (
        <ModalContainer
            visible={props.visible}
        >
            <Text style={styles.title}>{ date.toLocaleDateString("en-GB") }</Text>

            <View style={styles.btnContainer}>
                <GeneralButton
                    text="Attending"
                    style={{marginTop: 15}}
                />

                <GeneralButton
                    text="Not Attending"
                    style={{marginTop: 15, backgroundColor: '#cb4038'}}
                />
            </View>

            <Text style={styles.info}>Please opt in or out for dinner on { date.toLocaleDateString("en-GB") }.</Text>
        </ModalContainer>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: '500'
    },
    info: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginTop: 20
    },
    btnContainer: {
        width: '100%',
        paddingHorizontal: 10
    }
});