import { ReactElement } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default function SafeContainer(props: any): ReactElement {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{height: "100%"}}
        >
            <ScrollView
                style={[styles.container, props.style, {
                    backgroundColor: props.backgroundColor ? props.backgroundColor : '#fff'
                }]}
                contentContainerStyle={[props.containerStyle, {paddingBottom: 20}]}
            >
                { props.children }
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});