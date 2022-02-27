import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, Platform, Alert } from 'react-native'
import Label from '../../Arhiel/component/Label'
import TextArea from '../../Arhiel/component/TextArea'
import TextBox from '../../Arhiel/component/TextBox'
import Tombol from '../../Arhiel/component/Tombol'
import SelectImage from '../../Arhiel/component/SelectImage'
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import firestore from '@react-native-firebase/firestore';
import TextBoxRp from '../../Arhiel/component/TextboxRp'

const AddBarang = props => {

    const reference = storage().ref('black-t-shirt-sm.png');
    const [namaBarang, setnamaBarang] = useState("")
    const [kodeBarang, setkodeBarang] = useState("")
    const [deskripsiBarang, setdeskripsiBarang] = useState("")
    const [gambarBarang, setgambarBarang] = useState("")
    const [hargaBarang, sethargaBarang] = useState("")


    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const onImageSelected = (uri) => {
        setgambarBarang(uri)
    }
    const simpanHandler = async () => {
        const data = {
            namaBarang,
            kodeBarang,
            deskripsiBarang,
            hargaBarang : parseInt(hargaBarang)
        }

        const a = await firestore()
            .collection('product')
            .add(data)
        console.log(a)
    }
    const simpanHandler2 = async () => {
        setUploading(true);
        setTransferred(0);


        const uploadUri = Platform.OS === 'ios' ? gambarBarang.replace('file://', '') : gambarBarang;
        const task = storage()
            .ref("arhiel.jpg")
            .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        try {
            await task;
        } catch (e) {
            console.error(e);
        }
        setUploading(false);
        Alert.alert(
            'Photo uploaded!',
            'Your photo has been uploaded to Firebase Cloud Storage!'
        );


        const data = {
            namaBarang,
            kodeBarang,
            deskripsiBarang,
            gambarBarang
        }
        // await reference.putFile(gambarBarang);
    }

    return (
        <View style={{ padding: 10 }}>
            <Label>Kode Barang</Label>
            <TextBox value={kodeBarang} onChange={(value) => setkodeBarang(value)} placeholder="Masukan Kode Barang" />
            <Label>Nama Barang</Label>
            <TextBox value={namaBarang} onChange={(value) => setnamaBarang(value)} placeholder="Masukan Nama Barang" />
            <Label>Deskripsi Barang</Label>
            <TextArea value={deskripsiBarang} onChange={(value) => setdeskripsiBarang(value)} placeholder="Masukan Deskripsi Barang" />
            <Label>Harga Barang</Label>
            <TextBoxRp value={hargaBarang} onChange={(value) => sethargaBarang(value)} placeholder="Masukan Harga Barang" />
            <Label>Pilih Foto Product</Label>
            <SelectImage onSelected={onImageSelected} />
            {
                uploading ?
                    <Progress.Bar progress={transferred} width={300} color='#FF6600' />
                    :
                    <Tombol title="Simpan" onPress={simpanHandler} />
            }
        </View>
    )
}

export default AddBarang

const styles = StyleSheet.create({})
