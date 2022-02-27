import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';

const usersCollection = firestore().collection('Users');

const FireStore = () => {
    const tambahData = () => {
        firestore()
            .collection('Users')
            .add({
                name: 'Ada Lovelace',
                age: 30,
            })
            .then(() => {
                console.log('User added!');
            });
    }
    let options = {
        title: 'Select Image',
        customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        maxWidth:300,
        maxHeight:300
    };

    const pilihgambar = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response)
                const source = { uri: response.assets[0].uri };
                // alert()
            }
        });
    }
    return (
        <View>
            <Text>Testing</Text>
            <View>
                <TouchableOpacity>
                    <Text onPress={pilihgambar}>COba Simpan</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FireStore

const styles = StyleSheet.create({})
