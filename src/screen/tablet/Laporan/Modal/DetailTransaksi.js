import React, { useState } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { Portal, Modal, Title, Button, ActivityIndicator, Avatar } from 'react-native-paper'
import { Rp } from '../../../../function/Rupiah'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList } from 'react-native-gesture-handler'
import ListBarang from './ListBarang'
import { ArhielTgl } from '../../../../function/ArhielTgl'

const DetailTransaksi = props => {
    const [visible, setVisible] = props.visible
    const item = props.data
    const customer = props.data.customer
    const dataBarang = props.data.dataBarang
    const voucher = props.data.voucher
    const [onLoading, setonLoading] = useState(false)

    const deleteCustomer = async () => {
        setquertion(false)
        setonLoading(true)
        // alert(item.id)
        await firestore().collection('penjualan').doc(item.id).delete()
        setVisible(false)
        setonLoading(false)
    }

    const getjumlahPembayaran = () => {
        if (dataBarang.length > 0) {

            return dataBarang.reduce((a, b) => {
                return a + (b.jumlah * b.hargaProduk);
            }, 0);
        } else {
            return 0
        }
    }
    const [quertion, setquertion] = useState(false)

    return (
        <Portal style={styles.portal}>
            <Modal visible={visible} dismissable={false} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 50, alignSelf: 'center', padding: 20 }}>

                {
                    customer ?
                        <View style={{ flexDirection: 'row', width: 800, alignItems: 'center' }}>
                            <View style={{ alignItems: 'center', width: 300 }}>
                                <Title style={{ textAlign: 'center', color: '#777777', fontSize: 15, fontWeight: 'bold', marginBottom: 20, paddingHorizontal: 10 }}>{ArhielTgl(props.data.tglTransaksi.toDate())}</Title>
                                {
                                    customer.fotoCustomer.url === "" ?
                                        <Avatar.Icon icon="account" color='#FFFFFF' style={{ backgroundColor: '#AAAAAA' }} />

                                        :
                                        <Avatar.Image source={{ uri: customer.fotoCustomer.url }} />

                                }


                                <Title style={styles.title}>{customer.namaCustomer}</Title>
                                <Text>{customer.kodeCustomer}</Text>
                                <Text>{customer.hpCustomer}</Text>
                                <Text style={{fontWeight:'bold', fontSize:17, marginTop:10}}>Voucher : {voucher.nomorVoucher}</Text>
                            </View>
                            <View style={{ flex: 1, height: 300 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#FFFFFF', borderColor: '#EEEEEE', borderWidth: 2 }}>
                                    <Text style={{fontSize: 15 }}>{voucher.tindakan}</Text>
                                    <Text style={{fontSize: 15 }}>{voucher.biaya}</Text>
                                </View>
                                <FlatList
                                    data={dataBarang}
                                    style={{ flex: 1, backgroundColor: '#EEEEEE', padding: 2 }}
                                    renderItem={({ item, index }) => {
                                        return <ListBarang item={item} />
                                    }}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#FFFFFF', borderColor: '#EEEEEE', borderWidth: 2 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Total Pembayaran</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{Rp(getjumlahPembayaran() + voucher.biaya, true)}</Text>
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

                        !quertion ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Button icon="close-thick" color="#AAAAAA" mode="text" onPress={() => setVisible(false)}>
                                    Tutup
                                </Button>

                                <Button icon="delete" color="#ff4242" mode="text" onPress={() => setquertion(true)}>
                                    Hapus
                                </Button>
                            </View>
                            :
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ textAlign: 'center' }}>Apakah Anda Yakin Ingin Menghapus Data Ini ?</Text>
                                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                    <Button icon="close-thick" color="#AAAAAA" mode="text" onPress={() => setquertion(false)}>
                                        Batal
                                    </Button>
                                    <Title style={{ color: '#AAAAAA' }}> | </Title>
                                    <Button icon="delete" color="#ff4242" mode="text" onPress={deleteCustomer}>
                                        Hapus
                                    </Button>
                                </View>
                            </View>
                }
            </Modal>
        </Portal>
    )
}

export default DetailTransaksi

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: '#777777'
    }
})
