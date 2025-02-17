import { ReactElement, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SubmitButton from './SubmitButton';
import SecondaryButton from './SecondaryButton';

export default function Form(props: any): ReactElement {

    const [loading, setLoading] = useState<boolean>(false);

    async function onMainButtonPress(): Promise<void> {
        setLoading(true);
        await props.onPress();
        setLoading(false);
    }

    return (
        <View style={[styles.container, props.style]}>
            <View>
                { props.children }
            </View>
            <View style={styles.buttons}>
                {
                    props.button &&
                    <SubmitButton
                        text={props.buttonText}
                        onPress={onMainButtonPress}
                        loading={loading}
                    />
                }
                {
                    props.secondButton &&
                    <SecondaryButton
                        text={props.secondButtonText}
                        onPress={props.secondButtonOnPress}
                        containerStyle={{marginTop: 25}}
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 30,
        justifyContent: 'space-between',
        height: Dimensions.get("window").height - 220
    },
    buttons: {
        alignItems: 'center'
    }
});