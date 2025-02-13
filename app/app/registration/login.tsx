import LinearBackground from '@/components/LinearBackground';
import { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';

export default function LoginScreen(): ReactElement {

    return (
        <LinearBackground style={styles.center}>

        </LinearBackground>
    );
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});