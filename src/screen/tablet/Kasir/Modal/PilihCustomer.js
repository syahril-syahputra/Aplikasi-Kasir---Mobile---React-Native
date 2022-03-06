import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Portal, Modal, Searchbar, Button, ActivityIndicator, Title, Snackbar } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import ListCustomer from './ListCustomer'
import AddCustomer from '../../DataCustomer/Modal/AddCustomer'
import { ArhielTglWithDay } from '../../../../function/ArhielTgl';


import { keranjangContext, voucherContext, printerContext } from '../../Kasir'
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from '@brooons/react-native-bluetooth-escpos-printer';
import { Rp } from '../../../../function/Rupiah'



const PilihCustomer = props => {
    const [visible, setVisible] = props.visible
    const [data, dispatchData] = useContext(keranjangContext)
    const [voucher, dispatchVoucher] = useContext(voucherContext)
    const [printer, dispatchPrinter] = useContext(printerContext)
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


    const printheader = async (namaApp) => {
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.printText(namaApp + "\n\r", {});
        await BluetoothEscposPrinter.printText(ArhielTglWithDay(new Date()) + "\n\r", {});
        await BluetoothEscposPrinter.printText("------------------------------\n\r", {});
    }
    const printbarang = async (nama, jumlah, total) => {
        let columnWidths = [12, 8, 12]
        await BluetoothEscposPrinter.printColumn(columnWidths,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT, BluetoothEscposPrinter.ALIGN.RIGHT],
            [nama, "X " + jumlah, total], {});
    }

    const printTotalBelanja = async (total) => {

        await BluetoothEscposPrinter.printText("------------------------------\n\r", {});
        let columnWidths = [16, 16]
        await BluetoothEscposPrinter.printColumn(columnWidths,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["Total Pembelian", total], {});
    }
    const printTindakan = async (tindakan, total) => {

        let columnWidths = [20, 12]
        await BluetoothEscposPrinter.printColumn(columnWidths,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            [tindakan, total], {});
    }
    const printTotalBayar = async (total) => {

        await BluetoothEscposPrinter.printText("------------------------------\n\r", {});
        let columnWidths = [16, 16]
        await BluetoothEscposPrinter.printColumn(columnWidths,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["Total", total], {});
    }
    const printFooter = async () => {

        await BluetoothEscposPrinter.printText("------------------------------\n\r", {});
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.printText("Terima Kasih\n\r", {});
        await BluetoothEscposPrinter.printText("------------------------------\n\r\n\r\n\r\n\r", {});
    }

    const getjumlah = () => {
        if (data.length > 0) {

            return data.reduce((a, b) => {
                return a + (b.jumlah * b.hargaProduk);
            }, 0);
        } else {
            return 0
        }
    }
    const selectCustomerHandler = async (customer) => {

        const result = {
            dataBarang: data,
            customer: customer,
            voucher: voucher,
            tglTransaksi: new Date()
        }
        // console.log(data)



        setisLoading(true)
        firestore().collection('penjualan').add(result).then(async (response) => {



            if (printer.status) {
                await printheader("INES Beauty Clinic")


                const total = getjumlah()
                if (data.length !== 0) {


                    await data.map(async (item, index) => {
                        await printbarang(item.namaProduk, item.jumlah, Rp(item.hargaProduk * item.jumlah, false))

                    })
                    await printTotalBelanja(Rp(total))
                }

                
                if (voucher.biaya !== 0) {
                    await printTindakan(voucher.tindakan, Rp(voucher.biaya, false))
                    await printTotalBayar(Rp(total + voucher.biaya))
                }

                await printFooter()


            }

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
        dispatchVoucher({ type: 'clear' })

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
