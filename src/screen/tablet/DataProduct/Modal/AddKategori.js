import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Button, Modal, Portal, Provider, TextInput, Title } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'

const AddKategori = props => {

    const [visible, setVisible] = props.visible
    
    const selectedKategori = props.selectedKategori

    const [namaKategori, setnamaKategori] = useState("")
    const [deskripsiKategori, setdeskripsiKategori] = useState("")

    const [onLoading, setonLoading] = useState(false)

    const simpan = async () => {
        if (namaKategori === "" || deskripsiKategori === "") {
            alert("Masukan Nama Dan Deskripsi Kategori")
        } else {
            setonLoading(true)
            const dataresult = {
                namaKategori,
                deskripsiKategori
            }
            let sender
            if (selectedKategori) {
                // await firestore = firestore().collection('kategoriProduk').doc()
                
                sender = await firestore()
                    .collection('kategoriProduk')
                    .doc(selectedKategori.id)
                    .update(
                        dataresult
                    )
                props.setSelectedKategori({...selectedKategori, ...dataresult})
            } else {
                sender = await firestore().collection('kategoriProduk').add(dataresult)
            }

            setonLoading(false)
            // console.log(sender)
            // const idKategori = sender._documentPath._parts[1]
            setVisible(false)
            setnamaKategori("")
            setdeskripsiKategori("")

        }
    }
    useEffect(() => {

        if (selectedKategori) {
            setnamaKategori(selectedKategori.namaKategori)
            setdeskripsiKategori(selectedKategori.deskripsiKategori)
        }
    }, [visible])

    return (
        <Portal style={styles.portal}>
            <Modal dismissable={false} visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 50, alignSelf: 'center', padding: 20 }}>
                <Text>Tambah Kategori</Text>
                <View style={{ width: 300 }}>
                    <TextInput
                        mode="flat"
                        label="Nama Kategori"
                        outlineColor='#FF6600'
                        selectionColor='#FFFF00'
                        activeOutlineColor='#DDDDDD'
                        activeUnderlineColor='#FF6600'
                        selectionColor="#777777"
                        style={{ backgroundColor: '#FFFFFF' }}
                        placeholder="Nama Kategori"
                        value={namaKategori}
                        onChangeText={text => setnamaKategori(text)}
                    />
                    <TextInput
                        mode="flat"
                        label="Deskripsi Kategori"
                        outlineColor='#FF6600'
                        selectionColor='#FFFF00'
                        activeOutlineColor='#DDDDDD'
                        activeUnderlineColor='#FF6600'
                        multiline={true}
                        numberOfLines={5}
                        selectionColor="#777777"
                        style={{ backgroundColor: '#FFFFFF', color: '#CCCCCC' }}
                        placeholder="Deskripsi Kategori"
                        value={deskripsiKategori}
                        onChangeText={text => setdeskripsiKategori(text)}
                    />
                    {
                        onLoading ?
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

export default AddKategori

const styles = StyleSheet.create({
    portal: {
        justifyContent: 'center'
    }
})
