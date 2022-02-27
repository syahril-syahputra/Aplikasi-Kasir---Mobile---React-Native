import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Button, Modal, Portal } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import SelectImage from '../../../../Arhiel/component/SelectImage'
import * as Progress from 'react-native-progress';
import storage from '@react-native-firebase/storage';
import TextBox from '../../../../Arhiel/component/TextBox'
import NamaFile from '../../../../function/NamaFile'
import getFileExtension from '../../../../function/GetFileExtention'
import TextBoxEmail from '../../../../Arhiel/component/TextBoxEmail'
import auth from '@react-native-firebase/auth'
import TextBoxPassword from '../../../../Arhiel/component/TextBoxPassword'

const AddUser = props => {

    const selectedUser = props.selectedUser

    const [visible, setVisible] = props.visible

    const [namaUser, setnamaUser] = useState("")
    const [emailUser, setemailUser] = useState("")
    const [passwordUser, setpasswordUser] = useState("")
    const [fotoUser, setfotoUser] = useState(null)

    const [onLoading, setonLoading] = useState(false)
    const [onUploading, setonUploading] = useState(false)
    const [transferred, setTransferred] = useState(0);

    const simpan = async () => {

        if (selectedUser) {
            if (selectedUser.fotoUser.url === fotoUser) {
                setonLoading(true)
                kirim(selectedUser.fotoUser.url, selectedUser.fotoUser.file)
            } else {


                upload("user/" + NamaFile(getFileExtension(fotoUser)))
            }
        } else {
            if (namaUser === "" || emailUser === "" || passwordUser === "") {
                alert("Masukan Nama Dan Kode User")
            } else if (fotoUser) {

                upload("user/" + NamaFile(getFileExtension(fotoUser)))
            } else {

                setonLoading(true)
                kirim("", "")
            }
        }

    }
    const kirim = async (urlGambar, namaFile) => {

        const dataresult = {
            namaUser,
            emailUser,
            passwordUser,
            fotoUser: { url: urlGambar, file: namaFile }
        }
        // if (selectedUser) {
        //     sender = await firestore()
        //         .collection('User')
        //         .doc(selectedUser.id)
        //         .update(dataresult)
        // } else {
            
        // }


        auth()
            .createUserWithEmailAndPassword(emailUser, passwordUser)
            .then(async (user) => {
                console.log(user.user.uid)
                await firestore()
                .collection('User')
                .add({idUser:user.user.uid, ...dataresult})
                
                setVisible(false)
                setonLoading(false)
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                   alert("Email Sudah Di Gunakan")
                }

                if (error.code === 'auth/invalid-email') {
                    alert("Email Yang Anda Masukan Tikda Value")
                }

                setonLoading(false)
                alert(error)
            });


        if (props.callBack) {
            const newid = sender._documentPath._parts[1]
            // console.log({id : newid, ...dataresult})
            await props.callBack({ id: newid, ...dataresult })

        }

    }
    const upload = async (namaFile) => {
        setonLoading(true)

        if (selectedUser) {
            await storage().ref(selectedUser.fotoUser.file).delete()
        }

        setonUploading(true);
        setTransferred(0);


        const ref = storage().ref(namaFile)

        const uploadUri = Platform.OS === 'ios' ? fotoUser.replace('file://', '') : fotoUser;
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




        // await reference.putFile(fotoUser);
    }
    useEffect(() => {

        if (visible) {
            if (selectedUser) {
                setnamaUser(selectedUser.namaUser)
                setemailUser(selectedUser.emailUser)
                setpasswordUser(selectedUser.passwordUser)
                setfotoUser(selectedUser.fotoUser.url)
            } else {
                setnamaUser("")
                setemailUser("")
                setpasswordUser("")
                setfotoUser(null)
            }

        }
    }, [visible])

    return (
        <Portal style={styles.portal}>
            <Modal dismissable={false} visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 50, alignSelf: 'center', padding: 20 }}>
                <Text>Pelanggan</Text>
                <View style={{ width: 600, flexDirection: 'row', alignItems: 'flex-start' }}>

                    <SelectImage value={fotoUser} onSelected={uri => setfotoUser(uri)} />

                    <View style={{ flex: 1 }}>
                        <TextBox title="Nama User" value={namaUser} onChangeText={(text) => setnamaUser(text)} />
                        <TextBoxEmail title="Email User" value={emailUser} onChangeText={(text) => setemailUser(text)} />
                        <TextBoxPassword title="Password" value={passwordUser} onChangeText={(text) => setpasswordUser(text)} />

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

export default AddUser

const styles = StyleSheet.create({
    portal: {
        justifyContent: 'center'
    }
})
