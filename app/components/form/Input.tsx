import { ReactElement } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Label from './Label';

export default function Input(props: any): ReactElement {

    const [input, setInput] = props.input;

    return (
        <View style={[styles.container, props.containerStyle, {
            marginTop: props.marginTop ? 20 : props.containerStyle?.marginTop
        }]}>
            <Label label={props.label} />
            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder={props.placeholder}
                style={[styles.input, styles.shadow, props.style, {
                    height: props.large ? 200 : 50,
                    backgroundColor: props.disabled ? "#eee" : "#fff"
                }]}
                multiline={props.large}
                textContentType={props.type}
                secureTextEntry={props.type === "password"}
                autoComplete={props.autoComplete}
                autoCapitalize={props.type === "emailAddress" || props.type === "password" ? "none" : "sentences"}
                editable={!props.disabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    input: {
        width: '100%',
        marginTop: 3,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        paddingHorizontal: 8,
        fontSize: 16
    },
    shadow: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5
    }
});