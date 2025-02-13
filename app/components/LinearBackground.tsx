import { LinearGradient } from 'expo-linear-gradient';
import { ReactElement } from 'react';
import { StyleSheet } from 'react-native';

export default function LinearBackground(props: any): ReactElement {

    return (
        <LinearGradient
            style={[styles.container, props.style]}
            colors={[
                "#1BB100",
                "#148100"
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x:0, y: 1 }}
        >
            { props.children }
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})