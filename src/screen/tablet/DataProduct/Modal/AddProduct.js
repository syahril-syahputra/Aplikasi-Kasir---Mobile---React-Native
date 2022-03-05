import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Button, Modal, Portal, Provider, TextInput, Title } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import SelectImage from '../../../../Arhiel/component/SelectImage'
import * as Progress from 'react-native-progress';
import storage from '@react-native-firebase/storage';
import TextBox from '../../../../Arhiel/component/TextBox'
import TextBoxRp from '../../../../Arhiel/component/TextboxRp'
import TextArea from '../../../../Arhiel/component/TextArea'
import NamaFile from '../../../../function/NamaFile'
import getFileExtension from '../../../../function/GetFileExtention'

const AddProduct = props => {

    const selectedKategori = props.selectedKategori
    const selectedProduct = props.selectedProduct

    const [visible, setVisible] = props.visible

    const [namaProduk, setnamaProduk] = useState("")
    const [kodeProduk, setkodeProduk] = useState("")
    const [deskripsiProduk, setdeskripsiProduk] = useState("")
    const [hargaProduk, sethargaProduk] = useState("")
    const [gambarBarang, setgambarBarang] = useState(null)

    const [onLoading, setonLoading] = useState(false)
    const [onUploading, setonUploading] = useState(false)
    const [transferred, setTransferred] = useState(0);

    const simpan = async () => {
        if (selectedProduct) {
            if (selectedProduct.gambarProduk.url === gambarBarang) {
                setonLoading(true)
                console.log('a')
                kirim(selectedProduct.gambarProduk.url, selectedProduct.gambarProduk.file)
            } else {


                upload("produk/" + NamaFile(getFileExtension(gambarBarang)))
            }
        } else {
            if(gambarBarang)
            {

                upload("produk/" + NamaFile(getFileExtension(gambarBarang)))
            }else
            {
                kirim("", "")
            }

        }

    }
    const kirim = async (urlGambar, namaFile) => {

        const dataresult = {
            kodeProduk,
            namaProduk,
            hargaProduk: parseInt(hargaProduk),
            deskripsiProduk,
            kategori: selectedKategori.id,
            gambarProduk: { url: urlGambar, file: namaFile }
        }
        let sender;
        if (selectedProduct) {
            sender = await firestore()
                .collection('produk')
                .doc(selectedProduct.id)
                .update(dataresult)
        } else {
            sender = await firestore()
                .collection('produk')
                .add(dataresult)
        }
        setonLoading(false)
        setVisible(false)
        // console.log(sender)
        // setVisible(false)
        // upload(sender._documentPath._parts[1])
    }
    const upload = async (namaFile) => {
        setonLoading(true)

        if (selectedProduct) {
            await storage().ref(selectedProduct.gambarProduk.file).delete()
        }

        setonUploading(true);
        setTransferred(0);


        const ref = storage().ref(namaFile)

        const uploadUri = Platform.OS === 'ios' ? gambarBarang.replace('file://', '') : gambarBarang;
        const task = ref.putFile(uploadUri);
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
        var downloadUrl = await ref.getDownloadURL()
        setonUploading(false);
        setTransferred(0)
        kirim(downloadUrl, namaFile)




        // await reference.putFile(gambarBarang);
    }
    useEffect(() => {

        if (visible) {
            if (selectedProduct) {
                setnamaProduk(selectedProduct.namaProduk)
                setkodeProduk(selectedProduct.kodeProduk)
                setdeskripsiProduk(selectedProduct.deskripsiProduk)
                sethargaProduk(selectedProduct.hargaProduk)
                setgambarBarang(selectedProduct.gambarProduk.url)
            } else {
                setnamaProduk("")
                setkodeProduk("")
                setdeskripsiProduk("")
                sethargaProduk("")
                setgambarBarang(null)
            }

        }
    }, [visible])

    return (
        <Portal style={styles.portal}>
            <Modal dismissable={false} visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 50, alignSelf: 'center', padding: 20 }}>
                <Text>Produk</Text>
                <View style={{ width: 300 }}>
                    <TextBox title="Kode Barang" value={kodeProduk} onChangeText={(text) => setkodeProduk(text)} />
                    <TextBox title="Nama Barang" value={namaProduk} onChangeText={(text) => setnamaProduk(text)} />
                    <TextBoxRp title="Harga Barang" value={hargaProduk} onChangeText={(text) => sethargaProduk(text)} />
                    <TextArea title="Deskripsi Barang" value={deskripsiProduk} onChangeText={(text) => setdeskripsiProduk(text)} />

                    <SelectImage value={gambarBarang} onSelected={uri => setgambarBarang(uri)} />
                    {
                        onLoading ?
                            onUploading ?


                                <Progress.Bar progress={transferred} width={300} color='#FF6600' />
                                :
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                                    <ActivityIndicator animating={true} color={"#FF6600"} style={{ marginRight: 5 }} />
                                    <Text style={{ color: '#FF6600' }}>Loading</Text>
                                </View>
                            :

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <Button icon="close-thick" color="#FF0000" mode="text" onPress={() => setVisible(false)}>
                                    Batal
                                </Button>
                                <Button icon="camera" mode="text" onPress={simpan}>
                                    Simpan
                                </Button>
                            </View>
                    }
                </View>
            </Modal>
        </Portal>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    portal: {
        justifyContent: 'center'
    }
})
