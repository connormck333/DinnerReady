import { ReactElement, useContext, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import ModalContainer from "./ModalContainer";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { Status, UserContextType } from "@/methods/utils/interfaces";
import { startDinner } from "@/methods/dinnerManagement/startDinner";
import UserContext from "@/methods/context/userContext";

export default function StartDinnerModal(props: any): ReactElement {

    const [user] = useContext(UserContext) as UserContextType;
    const [visible, setVisible] = props.visible;
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function sendDinnerReminders(): Promise<void> {
        setLoading(true);

        const date: string = new Date(Date.now()).toLocaleDateString("en-GB");
        const response: Status = await startDinner(user.email, date, description);

        setLoading(false);

        if (!response.success) {
            Alert.alert("Error", "Could not send reminders. Please try again later.");
        } else {
            setVisible(false);
        }
    }

    return (
        <ModalContainer
            visible={props.visible}
            containerStyle={styles.container}
        >
            <Input
                label="Description"
                placeholder="Enter a description of the dinner you are making tonight"
                input={[description, setDescription]}
                style={styles.input}
                large
            />

            <SubmitButton
                text="Send"
                onPress={sendDinnerReminders}
                loading={loading}
                marginTop
            />
        </ModalContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%'
    },
    input: {
        backgroundColor: '#f4f4f4'
    }
});
