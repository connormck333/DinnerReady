import { View, StyleSheet, Text, Alert } from 'react-native';
import ModalContainer from './ModalContainer';
import GeneralButton from '../buttons/GeneralButton';
import { useContext, useState } from 'react';
import UserContext from '@/methods/context/userContext';
import { Status, UserContextType } from '@/methods/utils/interfaces';
import { optInForDinner } from '@/methods/dinnerManagement/optInForDinner';
import { optOutForDinner } from '@/methods/dinnerManagement/optOutForDinner';

export default function CalendarEventModal(props: any) {

    const [user, setUser] = useContext(UserContext) as UserContextType;
    const [inLoading, setInLoading] = useState<boolean>(false);
    const [outLoading, setOutLoading] = useState<boolean>(false);
    const [visible, setVisible] = props.visible;
    const date = new Date(props.date);

    async function optIn(): Promise<void> {
        if (inLoading || outLoading) return;

        setInLoading(true);
        const response: Status = await optInForDinner(user.email, date.toLocaleDateString("en-GB"));
        setInLoading(false);

        handleResponse(response);
    }

    async function optOut(): Promise<void> {
        if (inLoading || outLoading) return;

        setOutLoading(true);
        const response: Status = await optOutForDinner(user.email, date.toLocaleDateString("en-GB"));
        setOutLoading(false);

        handleResponse(response);
    }

    function handleResponse(response: Status): void {
        if (!response.success) {
            Alert.alert("Error", "There was an error processing this request. Please try again later.");
            return;
        }

        Alert.alert("Success", "Your response has been recorded.");
        setVisible(false);
    }

    return (
        <ModalContainer
            visible={props.visible}
        >
            <Text style={styles.title}>{ date.toLocaleDateString("en-GB") }</Text>

            <View style={styles.btnContainer}>
                <GeneralButton
                    text="Attending"
                    style={{marginTop: 15}}
                    onPress={optIn}
                    loading={inLoading}
                />

                <GeneralButton
                    text="Not Attending"
                    style={{marginTop: 15, backgroundColor: '#cb4038'}}
                    onPress={optOut}
                    loading={outLoading}
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