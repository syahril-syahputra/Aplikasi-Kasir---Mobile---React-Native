import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Portal, Modal, Searchbar, Button, ActivityIndicator, Title, Snackbar } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import ListCustomer from './ListCustomer'
import AddCustomer from '../../DataCustomer/Modal/AddCustomer'

import { keranjangContext, voucherContext } from '../../Kasir'



const PilihCustomer = props => {
    const [visible, setVisible] = props.visible

    const [data, dispatchData] = useContext(keranjangContext)
    const [voucher, dispatchVoucher] = useContext(voucherContext)
    const [isLoading, setisLoading] = useState(false)

    const [dataCustomer, setdataCustomer] = useState([])
    useEffect(() => {
        firestore().collection('customer').onSnapshot(onResult, onError)

    }, [])


    function onResult(QuerySnapshot) {

        let data = [];
        QuerySnapshot.docs.map((doc) => {
            data.push({ id: doc._ref._documentPath._parts[1], ...doc._data })

        })
        setdataCustomer(data)
        // console.log(data)
    }

    function onError(error) {
        console.error(error);
    }
    const selectCustomerHandler = (customer) => {

        const result = {
            dataBarang: data,
            customer: customer,
            voucher : voucher,
            tglTransaksi: new Date()
        }
        setisLoading(true)
        firestore().collection('penjualan').add(result).then(response => {
            setVisible(false)
            setisLoading(false)
            setsnackbar(true)
            dispatchData({ type: 'clear' })

        })
    }
    const [searchText, setsearchText] = useState("")
    const filterData = () => {
        return dataCustomer.filter(item =>
            item.namaCustomer.toLowerCase().includes(searchText.toLowerCase()) ||
            item.hpCustomer.toLowerCase().includes(searchText.toLowerCase())
        )
    }
    const callBack = async (customer) => {
        setVisible(true)
        const result = {
            dataBarang: data,
            customer: customer,
            tglTransaksi: new Date()
        }
        setisLoading(true)
        await firestore().collection('penjualan').add(result)
        setisLoading(false)
        setVisible(false)

        setsnackbar(true)
        dispatchData({ type: 'clear' })
        dispatchVoucher({type : 'clear'})

    }
    const [modalAddCustomer, setmodalAddCustomer] = useState(false)
    const [snackbar, setsnackbar] = useState(false)
    return (
        <Portal style={styles.portal}>
            <Snackbar visible={snackbar} duration={3000} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }} onDismiss={() => setsnackbar(false)}>Data Telah Di Simpan</Snackbar>
            <AddCustomer callBack={callBack} visible={[modalAddCustomer, setmodalAddCustomer]} />
            {isLoading ?
                <Modal dismissable={false} visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: '#DDDDDD', minWidth: 200, padding: 20, marginHorizontal: 50, alignSelf: 'center', alignItems: 'center', borderRadius: 20 }}>
                    <ActivityIndicator color='#FF6600' size={40} style={{ marginBottom: 20 }} />
                    <Title style={{ color: '#FF6600', fontSize: 15 }}>Mengirim Data</Title>
                </Modal>
                :

                <Modal dismissable={false} visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: '#DDDDDD', marginHorizontal: 50, alignSelf: 'center', padding: 10 }}>
                    <Text>Pilih Pelanggan</Text>
                    <View style={{ width: 600 }}>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between' }}>
                            <Button onPress={() => { setmodalAddCustomer(true); setVisible(false) }} icon="plus" color='#777777' mode="contained" style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                                Customer Baru
                            </Button>
                            <Searchbar value={searchText} onChangeText={text => setsearchText(text)} placeholder='Cari Kustomer' style={{ elevation: 0, flex: 1 }} />
                        </View>

                        <FlatList
                            style={{ height: 300, backgroundColor: '#FFFFFF' }}
                            data={filterData()}
                            renderItem={({ item }) => <ListCustomer onPress={selectCustomerHandler} item={item} />}
                        />
                        <View style={{ alignItems: 'flex-start', paddingTop: 10 }}>

                            <Button onPress={() => setVisible(false)} mode='text' icon="close-thick" color='#FF0000'>Batal</Button>
                        </View>
                    </View>
                </Modal>
            }
        </Portal>
    )
}

export default PilihCustomer

const styles = StyleSheet.create({})
