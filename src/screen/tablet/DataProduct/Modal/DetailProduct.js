import React, { useState } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { Portal, Modal, Title, Button, ActivityIndicator } from 'react-native-paper'
import { Rp } from '../../../../function/Rupiah'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

const DetailProduct = props => {
    const [visible, setVisible] = props.visible
    const [modalEdit, setmodalEdit] = props.modalEdit
    const item = props.product
    const [onLoading, setonLoading] = useState(false)

    const deleteProduk = async () => {
        var data = storage().ref(item.gambarProduk.file);
        setonLoading(true)
        await data.delete()
        await firestore()
            .collection('produk')
            .doc(item.id)
            .delete()
        setonLoading(false)
        setVisible(false)
    }

    return (
        <Portal style={styles.portal}>
            <Modal visible={visible} dismissable={false} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 50, alignSelf: 'center', padding: 20 }}>

                {
                    item ?
                        <View style={{ flexDirection: 'row', width: 600, alignItems: 'center' }}>
                            <Image source={{ uri: item.gambarProduk.url }} style={{ backgroundColor: '#EEEEEE', marginRight: 10, borderRadius: 10, resizeMode: 'contain' }} width={200} height={200} />

                            <View>
                                <View>
                                    <Title style={styles.title}>Kode Produk</Title>
                                    <Text>{item.kodeProduk}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Nama Produk</Title>
                                    <Text>{item.namaProduk}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Deskripsi Produk</Title>
                                    <Text>{item.deskripsiProduk}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Harga Produk</Title>
                                    <Text>{Rp(item.hargaProduk, true)}</Text>
                                </View>
                            </View>
                        </View>
                        : null
                }



                {
                    onLoading ?
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <ActivityIndicator animating={true} color={"#FF6600"} style={{ marginRight: 5 }} />
                            <Text style={{ color: '#FF6600' }}>Loading</Text>
                        </View> :


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Button icon="close-thick" color="#AAAAAA" mode="text" onPress={() => setVisible(false)}>
                                Tutup
                            </Button>
                            <View style={{ flexDirection: 'row' }}>
                                <Button icon="pencil" color="#5f6bff" mode="text" onPress={() => {setVisible(false); setmodalEdit(true)}}>
                                    Edit
                                </Button>
                                <Button icon="delete" color="#ff4242" mode="text" onPress={deleteProduk}>
                                    Hapus
                                </Button>
                            </View>
                        </View>
                }
            </Modal>
        </Portal>
    )
}

export default DetailProduct

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: '#777777'
    }
})
