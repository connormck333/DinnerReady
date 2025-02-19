import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ReactElement, useState } from "react";
import { LayoutChangeEvent, Modal, StyleSheet, TouchableOpacity, View } from "react-native";

interface Pos {
    x: number,
    y: number,
    width: number,
    height: number
}

export default function ModalContainer(props: any): ReactElement {

    const [visible, setVisible] = props.visible;
    const [containerPos, _setContainerPos] = useState<Pos | undefined>(undefined);

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
                        style={[styles.container, props.containerStyle]}
                    >
                        { props.children }
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