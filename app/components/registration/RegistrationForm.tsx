import { ReactElement } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Form from "../form/Form";

export default function RegistrationForm(props: any): ReactElement {

    return (
        <Form
            style={styles.form}
            button={true}
            buttonText={props.buttonText}
            buttonOnPress={props.buttonOnPress}
        >
            { props.children }
        </Form>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30,
        height: Dimensions.get("window").height - 240
    }
});