import { forwardRef, useImperativeHandle, useLayoutEffect } from 'react';
import {  Dimensions } from 'react-native';
import Animated, { Easing, runOnJS, SharedValue, StyleProps, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { LowerContainerRef } from '@/methods/utils/interfaces';

const { height } = Dimensions.get("window");

const LoweringContainer = forwardRef<LowerContainerRef, any>((props: any, ref) => {

    const navigation = useNavigation();
    const translateY: SharedValue<number> = useSharedValue(-height);

    useLayoutEffect(() => {
        (() => {
            translateY.value = withTiming(0, {
                duration: 500,
                easing: Easing.out(Easing.ease)
            });
        })();
    }, []);

    useImperativeHandle(ref, () => ({
        closeScreen: () => startCloseAnimation()
    }));

    const animatedStyle: StyleProps = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    function startCloseAnimation(): void {
        translateY.value = withTiming(-height, {
            duration: 500,
            easing: Easing.out(Easing.ease)
        }, () => {
            runOnJS(navigation.goBack)();
        });
    }

    return (
        <Animated.View style={[props.style, animatedStyle]}>
            { props.children }
        </Animated.View>
    );
})

export default LoweringContainer;