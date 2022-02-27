import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';

const SelectImage = props => {
    // const [gambar, setgambar] = useState(props.value)
    let options = {
        title: 'Select Image',
        customButtons: [
            { name: 'customOptionKey', title: 'Pilih Gambar Product' },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        maxWidth: 300,
        maxHeight: 300
    };

    let optionsCamera = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        maxWidth: 300,
        maxHeight: 300
    };

    const getImage = () => {
        ImagePicker.launchCamera(optionsCamera, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                // console.log(res)
                // const source = { uri: res.assets[0].uri };
                // addImageToData(source, "Camera")
                props.onSelected(response.assets[0].uri)
            }
        });
    }

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
                // console.log(response)
                // const source = { uri: response.assets[0].uri };
                // console.log(source)
                props.onSelected(response.assets[0].uri)
                // alert()
            }
        });
    }
    return (
        <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#FFFFFF', padding:10}}>
            <Image source={props.value ? {uri : props.value} : require("../../image/image/defaultProduct.jpg")} style={styles.gambar} />
            <View style={{ flexDirection: 'column', marginLeft:10 }}>
                <TouchableOpacity onPress={pilihgambar} style={styles.button}>
                    <Text style={{color:'#FFFFFF', fontWeight:'bold', textAlign:'center'}}>Pilih Gambar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={getImage} style={styles.button}>
                    <Text style={{color:'#FFFFFF', fontWeight:'bold', textAlign:'center'}}>Ambil Gambar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SelectImage

const styles = StyleSheet.create({
    gambar: {
        width: 100,
        height: 100,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#AAAAAA'
    },
    button: {
        backgroundColor: '#AAAAAA',
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:10,
        marginBottom:5,
    }
})
