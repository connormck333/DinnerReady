import { ReactElement, useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';

interface Pos {
    x: number,
    y: number,
    width: number,
    height: number
}

export default function JoinCodeModal(props: any): ReactElement {

    const [visible, setVisible] = props.visible;
    const [containerPos, _setContainerPos] = useState<Pos | undefined>(undefined);

    async function copyCode(): Promise<void> {
        await Clipboard.setStringAsync(props.code);
    }

    function setContainerPos(event: LayoutChangeEvent): void {
        const { x, y, width, height } = event.nativeEvent.layout;
        _setContainerPos({x, y, width, height});
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType='slide'
        >
            <View style={styles.background}>
                <TouchableOpacity
                    onPress={() => setVisible(false)}
                    style={styles.touchable}
                    activeOpacity={1}
                >
                    <View
                        onLayout={setContainerPos}
                        style={styles.container}
                    >
                        <Text style={styles.title}>Join Code</Text>
                        <View style={styles.codeContainer}>
                            <Text style={styles.code}>{ props.code }</Text>
                            <TouchableOpacity onPress={copyCode}>
                                <MaterialIcons name="content-copy" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.infoText}>Copy this code and send to your family!</Text>
                    </View>
                </TouchableOpacity>

                <View style={[styles.closeBtn, {
                    left: containerPos ? containerPos?.width + containerPos?.x - 30 : 0,
                    top: containerPos ? containerPos?.y - 15 : 0
                }]}>
                    <TouchableOpacity
                        style={styles.fill}
                        onPress={() => setVisible(false)}
                    >
                        <MaterialIcons name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    container: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 25,
        fontWeight: '600'
    },
    code: {
        fontSize: 33,
        fontWeight: '500',
        color: '#0151c4',
        marginTop: 10,
        letterSpacing: 5,
        marginRight: 5,
        marginLeft: 29 
    },
    infoText: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginTop: 20
    },
    center: {
        width: '100%',
        alignItems: 'center'
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    touchable: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeBtn: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: 40,
        width: 40,
        borderRadius: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.14,
        shadowRadius: 5
    },
    fill: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});