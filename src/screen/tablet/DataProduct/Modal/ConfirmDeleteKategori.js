import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Portal, Modal, Title, Button, ActivityIndicator } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'

const ConfirmDeleteKategori = props => {
    const [visible, setVisible] = props.visible
    const [kategori, setKategori] = props.selected
    const [onLoading, setonLoading] = useState(false)

    const hapus = async () => {
        setonLoading(true)
        await firestore().collection('kategoriProduk').doc(kategori.id).delete()
        setonLoading(false)
        setVisible(false)
        setKategori(null)
    }

    return (
        <Portal style={styles.portal}>
            <Modal dismissable={false} visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 50, alignSelf: 'center', padding: 20 }}>
                {
                    onLoading ?
                        <View>
                            <ActivityIndicator color='#FF6600' style={{marginBottom:15}} />
                            <Text style={{fontWeight:'bold', color:'#FF6600'}}>Menghapus Data Kategori</Text>
                        </View>
                    :
                        <View>
                            <Title style={{ textAlign: 'center', color: '#FF0000', marginBottom: 10 }}>Hapus Kategori ?</Title>
                            <Text>Apakah Anda Yakin Ingin Menghapus Kategori Ini</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                <Button icon="close-thick" color="#777777" mode="text" onPress={() => setVisible(false)}>
                                    Batal
                                </Button>
                                <Button icon="delete" color="#FF0000" mode="text" onPress={hapus}>
                                    Hapus
                                </Button>

                            </View>
                        </View>
                }

            </Modal>
        </Portal>
    )
}

export default ConfirmDeleteKategori

const styles = StyleSheet.create({})
