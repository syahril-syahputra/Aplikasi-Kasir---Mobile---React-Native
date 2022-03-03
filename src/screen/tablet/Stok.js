import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import { ActivityIndicator, DataTable, Title, Button, Provider } from 'react-native-paper';
import { ArhielTgl, ArhielTglLessTime, ArhielTglOnlyMonth, ArhielTglWithDay } from '../../function/ArhielTgl';
import firestore from '@react-native-firebase/firestore'
import { Rp } from '../../function/Rupiah';
import { ScrollView } from 'react-native-gesture-handler';
import MonthYearPicker from '../../Arhiel/component/MonthYearPicker';
import { useNavigation } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";
import InputStokAwal from './stok/modal/InputStokAwal';


const Stok = () => {
    const navigation = useNavigation();

    const [dataProduk, setdataProduk] = useState([])
    const [dataStokBulanIni, setdataStokBulanIni] = useState([])
    const [dataPenjualan, setdataPenjualan] = useState([])


    const [data, setdata] = useState([])

    const [isLoading, setisLoading] = useState(true)

    const [bulan, setbulan] = useState(new Date().getMonth())
    const [tahun, settahun] = useState(new Date().getFullYear())

    var endmonth = new Date(Date.UTC(tahun, bulan + 1, 0));
    var firstmonth = new Date(Date.UTC(tahun, bulan, 1));

    const showHarian = (tgl) => {
        // const data = new Date(tahun, bulan, tgl)
        // console.log(data)

    }
    const createValue = (angka) => {
        if (angka === null || angka === 0) {
            return <Text style={{ color: 'red' }}>0</Text>
        } else {
            return <Text style={{ color: 'green' }}>{angka}</Text>
        }
    }


    const createRows = async (datas, stok, penjualan) => {
        const tempdata = []
        datas.map((item, index) => {

            const oddeven = index % 2;
            tempdata.push(
                <TouchableOpacity onPress={() => showHarian()} key={index}>

                    <DataTable.Row style={{ backgroundColor: oddeven === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                        <DataTable.Cell>{item._data.kodeProduk}</DataTable.Cell>
                        <DataTable.Cell style={{ alignItems: 'center', borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{item._data.namaProduk}</DataTable.Cell>
                        <DataTable.Cell style={{ alignItems: 'center', borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{stok[item.id] || 0}</DataTable.Cell>
                        <DataTable.Cell style={{ alignItems: 'center', borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{penjualan[item.id] || 0}</DataTable.Cell>
                        <DataTable.Cell style={{ alignItems: 'center', borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{(stok[item.id] || 0) - (penjualan[item.id] || 0)}</DataTable.Cell>
                    </DataTable.Row>
                </TouchableOpacity>
            )
        })
        setdata(tempdata)

        setisLoading(false)
    }

    const refresh = async () => {
        setisLoading(true)
        const stokawalbulanan = await firestore()
            .collection('stok')
            .where('bulan', '==', bulan + 1)
            .where('tahun', '==', tahun)
            .get()

        const data = await firestore()
            .collection('produk')
            .get()
        const penjualan = await firestore()
            .collection('penjualan')
            .where('tglTransaksi', '>=', firstmonth)
            .where('tglTransaksi', '<=', endmonth)
            .get()



       
        const daftarbarangterjual = {}
        penjualan._docs.map((item, index) => {
            item._data.dataBarang.map((itemb, indexb) => {
                const idbarang = itemb.id
                const checkout = daftarbarangterjual[idbarang] || 0

                daftarbarangterjual[idbarang] = itemb.jumlah + checkout

            })
        })


        setdataProduk(data._docs)
        setdataPenjualan(daftarbarangterjual)

        if (stokawalbulanan._docs[0]) {
            setdataStokBulanIni(stokawalbulanan._docs[0]._data.data)

            createRows(data._docs, stokawalbulanan._docs[0]._data.data, daftarbarangterjual)
        } else {
            setdataStokBulanIni({})

            createRows(data._docs, {}, daftarbarangterjual)
            alert('Data Stok Awal ' + ArhielTglOnlyMonth(endmonth) + " Belum Di Masukan")
        }

    }

    useEffect(() => {
        refresh()
    }, [bulan, tahun])

    const [modalInputStokAwal, setmodalInputStokAwal] = useState(false)
    const finishStokAwal = async (stokawal) => {
        setisLoading(true)
        setmodalInputStokAwal(false)
        // setdataStokBulanIni(stokawal)

        const stokawalbulanan = await firestore()
            .collection('stok')
            .where('bulan', '==', bulan + 1)
            .where('tahun', '==', tahun)
            .get()


        if (stokawalbulanan._docs[0]) {

            firestore()
                .collection('stok')
                .doc(stokawalbulanan._docs[0].id)
                .update({ bulan: bulan + 1, tahun: tahun, data: stokawal })
        } else {
            await firestore()
                .collection('stok')
                .add({ bulan: bulan + 1, tahun: tahun, data: stokawal })

        }
        refresh()
    }
    return (
        <Provider>
            <InputStokAwal stok={dataStokBulanIni} finish={finishStokAwal} produk={dataProduk} visible={[modalInputStokAwal, setmodalInputStokAwal]} />
            <View style={{ flex: 1 }}>
                <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#DDDDDD' }}>


                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        {
                            !isLoading ?
                            <Button mode='contained' color='#FF6600' dark={true} style={{ marginRight: 10, borderRadius: 20 }} onPress={() => setmodalInputStokAwal(true)}>Masukan Stok Awal</Button>
                            :null
                        }
                        <Text style={{ color: '#777777', fontSize: 20, marginRight: 10, fontWeight: 'bold' }}>Pilih Periode : </Text>
                        <MonthYearPicker bulan={bulan} tahun={tahun} onChange={(bulan, tahun) => { setbulan(bulan); settahun(tahun) }} startYear={2021} />
                    </View>
                    {!isLoading ?
                        <View style={{ flexDirection: 'row' }}>
                            <Button icon="cloud-refresh" onPress={() => refresh()} color='#777777' mode='text'>Refresh</Button>

                        </View> : null
                    }
                </View>
                <DataTable style={{ margin: 20, width: Dimensions.get('window').width - 40, flex: 1 }}>
                    <DataTable.Header style={{ backgroundColor: '#f0f0f0', borderTopColor: '#DDDDDD', borderTopWidth: 1 }}>
                        <DataTable.Cell>Kode Produk</DataTable.Cell>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }}>Nama Produk</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }}>Stok Awal</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }}>Penjualan</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }}>Stok Akhir</DataTable.Title>
                    </DataTable.Header>

                    <ScrollView style={{ flex: 1 }}>
                        {
                            isLoading ?
                                <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF', flex: 1, paddingTop: 20, paddingBottom: 20 }}>
                                    <ActivityIndicator color='#777777' size={40} style={{ marginBottom: 10 }} />
                                    <Title style={{ color: '#777777', fontSize: 15 }}>Mohon Tunggu</Title>
                                </View>
                                :
                                data
                        }

                    </ScrollView>

                </DataTable>

            </View>
        </Provider>
    )
}

export default Stok

const styles = StyleSheet.create({
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})
