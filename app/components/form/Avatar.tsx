import { ReactElement } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Label from './Label';

export default function AvatarInput(props: any): ReactElement {

    const [avatar, setAvatar] = props.avatar;

    async function openCameraRoll(): Promise<void> {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    }

    return (
        <View style={styles.container}>
            <Label label={props.label} />
            <TouchableOpacity
                onPress={openCameraRoll}
                style={styles.circle}
            >
                { avatar === undefined ?
                    <Text style={styles.text}>Select</Text>
                    :
                    <Image
                        style={styles.img}
                        resizeMode="cover"
                        source={{ uri: avatar }}
                    />
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.14,
        shadowRadius: 5,
        marginTop: 15,
        overflow: 'hidden'
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#0080ac'
    },
    img: {
        width: '100%',
        height: '100%'
    }
});