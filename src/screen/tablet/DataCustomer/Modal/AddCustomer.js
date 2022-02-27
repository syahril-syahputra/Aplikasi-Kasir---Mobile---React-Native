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
import TextBoxHP from '../../../../Arhiel/component/TextBoxHP'
import { PaperSelect } from 'react-native-paper-select';
import { Picker } from '@react-native-picker/picker';

const AddCustomer = props => {

    const selectedCustomer = props.selectedCustomer

    const [visible, setVisible] = props.visible
    const [jenisKelamin, setjenisKelamin] = useState("")
    const [namaCustomer, setnamaCustomer] = useState("")
    const [umurCustomer, setumurCustomer] = useState("")
    const [pekerjaanCustomer, setpekerjaanCustomer] = useState("")
    const [kodeCustomer, setkodeCustomer] = useState("")
    const [alamatCustomer, setalamatCustomer] = useState("")
    const [hpCustomer, sethpCustomer] = useState("")
    const [fotoCustomer, setfotoCustomer] = useState(null)

    const [onLoading, setonLoading] = useState(false)
    const [onUploading, setonUploading] = useState(false)
    const [transferred, setTransferred] = useState(0);


    const simpan = async () => {

        if (selectedCustomer) {
            if (selectedCustomer.fotoCustomer.url === fotoCustomer) {
                setonLoading(true)
                kirim(selectedCustomer.fotoCustomer.url, selectedCustomer.fotoCustomer.file)
            } else {


                upload("customer/" + NamaFile(getFileExtension(fotoCustomer)))
            }
        } else {
            if (namaCustomer === "" || kodeCustomer === "") {
                alert("Masukan Nama Dan Kode Customer")
            } else if (fotoCustomer) {

                upload("customer/" + NamaFile(getFileExtension(fotoCustomer)))
            } else {

                setonLoading(true)
                kirim("", "")
            }
        }

    }
    const kirim = async (urlGambar, namaFile) => {

        const dataresult = {
            kodeCustomer,
            namaCustomer,
            hpCustomer,
            pekerjaanCustomer,
            umurCustomer,
            jenisKelamin,
            alamatCustomer,
            fotoCustomer: { url: urlGambar, file: namaFile },    
        }
        let sender;
        if (selectedCustomer) {
            sender = await firestore()
                .collection('customer')
                .doc(selectedCustomer.id)
                .update(dataresult)
        } else {
           dataresult['tglInput'] = new Date()
            sender = await firestore()
                .collection('customer')
                .add(dataresult)
        }

        setVisible(false)
        setonLoading(false)
        if (props.callBack) {
            const newid = sender._documentPath._parts[1]
            // console.log({id : newid, ...dataresult})
            await props.callBack({ id: newid, ...dataresult })
        }

    }
    const upload = async (namaFile) => {
        setonLoading(true)

        if (selectedCustomer) {
            await storage().ref(selectedCustomer.fotoCustomer.file).delete()
        }

        setonUploading(true);
        setTransferred(0);


        const ref = storage().ref(namaFile)

        const uploadUri = Platform.OS === 'ios' ? fotoCustomer.replace('file://', '') : fotoCustomer;
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




        // await reference.putFile(fotoCustomer);
    }
    useEffect(() => {

        if (visible) {
            if (selectedCustomer) {
                setnamaCustomer(selectedCustomer.namaCustomer)
                setkodeCustomer(selectedCustomer.kodeCustomer)
                setalamatCustomer(selectedCustomer.alamatCustomer)
                setumurCustomer(selectedCustomer.umurCustomer)
                setjenisKelamin(selectedCustomer.jenisKelamin)
                setpekerjaanCustomer(selectedCustomer.pekerjaanCustomer)
                sethpCustomer(selectedCustomer.hpCustomer)
                setfotoCustomer(selectedCustomer.fotoCustomer.url)
            } else {
                setnamaCustomer("")
                setkodeCustomer("")
                setalamatCustomer("")
                setpekerjaanCustomer("")
                setumurCustomer("")
                setjenisKelamin("")
                sethpCustomer("")
                setfotoCustomer(null)
            }

        }
    }, [visible])

    return (
        <Portal style={styles.portal}>
            <Modal dismissable={false} visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 50, alignSelf: 'center', padding: 20 }}>
                <Text>Pelanggan</Text>
                <View style={{ width: 600, flexDirection: 'row', alignItems: 'flex-start' }}>

                    <SelectImage value={fotoCustomer} onSelected={uri => setfotoCustomer(uri)} />

                    <View style={{ flex: 1 }}>
                        <TextBox title="Kode Customer" value={kodeCustomer} onChangeText={(text) => setkodeCustomer(text)} />
                        <TextBox title="Nama Customer" value={namaCustomer} onChangeText={(text) => setnamaCustomer(text)} />
                        <TextBox title="Umur Pasien" value={umurCustomer} onChangeText={(text) => setumurCustomer(text)} />
                        <TextBox title="Pekerjaan" value={pekerjaanCustomer} onChangeText={(text) => setpekerjaanCustomer(text)} />

                        <Picker
                            selectedValue={jenisKelamin}
                            pickerStyleType={false}
                            onValueChange={(itemValue, itemIndex) =>
                                setjenisKelamin(itemValue)
                            }>

                            <Picker.Item label="Jenis Kelamin" value="" />
                            <Picker.Item label="Pria" value="Pria" />
                            <Picker.Item label="Wanita" value="Wanita" />
                        </Picker>
                        <TextBoxHP title="No. HP Customer" value={hpCustomer} onChangeText={(text) => sethpCustomer(text)} />
                        <TextArea title="Alamat Customer" value={alamatCustomer} onChangeText={(text) => setalamatCustomer(text)} />

                    </View>
                </View>
                <View>
                    {
                        onLoading ?
                            onUploading ?

                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                                    <Progress.Bar progress={transferred} width={300} color='#FF6600' />
                                </View>
                                :
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                                    <ActivityIndicator animating={true} color={"#FF6600"} style={{ marginRight: 5 }} />
                                    <Text style={{ color: '#FF6600' }}>Loading</Text>
                                </View>
                            :

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <Button icon="close-thick" color="#FF0000" mode="text" onPress={() => {
                                    setVisible(false)
                                }}>
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

export default AddCustomer

const styles = StyleSheet.create({
    portal: {
        justifyContent: 'center'
    }
})
