import { ReactElement, useState } from "react";
import { StyleSheet } from "react-native";
import ModalContainer from "./ModalContainer";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";

export default function StartDinnerModal(props: any): ReactElement {

    const [input, setInput] = useState<string>("");

    return (
        <ModalContainer
            visible={props.visible}
            containerStyle={styles.container}
        >
            <Input
                label="Description"
                placeholder="Enter a description of the dinner you are making tonight"
                input={[input, setInput]}
                style={styles.input}
                large
            />

            <SubmitButton
                text="Send"
                onPress={() => {}}
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
