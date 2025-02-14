import { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import SubmitButton from './SubmitButton';

export default function Form(props: any): ReactElement {
    return (
        <View style={[styles.container, props.style]}>
            <View>
                { props.children }
            </View>
            {
                props.button &&
                <SubmitButton
                    text={props.buttonText}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 30,
        justifyContent: 'space-between'
    }
});