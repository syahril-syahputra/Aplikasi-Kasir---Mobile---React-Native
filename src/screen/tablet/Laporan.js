import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, DataTable, Provider, Title } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import { ArhielTgl, ArhielTglWithDay } from '../../function/ArhielTgl'
import { Rp } from '../../function/Rupiah'
import { ScrollView } from 'react-native-gesture-handler'
import DetailTransaksi from './Laporan/Modal/DetailTransaksi'
import DateTimePicker from '../../Arhiel/component/DateTimePicker'
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";

const LaporanTablet = props => {
    const route = useRoute()
    const navigation = useNavigation()
    // console.log(route.params.tgl)
    const [tanggal, settanggal] = useState(new Date(route.params.tahun, route.params.bulan, route.params.tgl))

    const [rowpdf, setrowpdf] = useState("")

    const createRow = () => {
        let temprow = "";
        dataPenjualan.map((item, index) => {

            const tgl = ArhielTgl(item.tglTransaksi.toDate())
            const oddeven = index % 2;
            // const dataBarang 
            let namaProduk = ""
            item.dataBarang.map((barang, indexbarang) => {
                namaProduk += barang.namaProduk + " "
            })

            temprow += `<tr>
                            <td style="padding:5px; border: 1px solid;">${tgl}</td>
                            <td style="padding:5px; text-align:left; border: 1px solid;">${item.customer.namaCustomer}</td>
                            <td style="padding:5px; text-align:center; border: 1px solid;">${item.customer.hpCustomer}</td>
                            <td style="padding:5px; text-align:left; border: 1px solid;">${item.customer.alamatCustomer}</td>
                            <td style="padding:5px; text-align:left; border: 1px solid;">${namaProduk}</td>
                            <td style="padding:5px; text-align:left; border: 1px solid;">${item.voucher.tindakan}</td>
                            <td style="padding:5px; text-align:right; border: 1px solid;">${Rp(getjumlahPembayaran(item.dataBarang, item.voucher.biaya), true)}</td>
                        </tr>`


        })
        setrowpdf(temprow)

    };
    useEffect(() => {
        // const date1 = new Date(tanggal.setHours(0, 0, 0, 0));
        // const date2 = new Date(tanggal.setHours(23, 59, 59, 59));
        setdataPenjualan([])
        const date1 = new Date(route.params.tahun, route.params.bulan, route.params.tgl, 0, 0, 0, 0);
        const date2 = new Date(route.params.tahun, route.params.bulan, route.params.tgl, 23, 59, 59, 59);
        const subscriber = firestore()
            .collection('penjualan')
            // .where('tglTransaksi', '>=', "2022-07-02")
            .where("tglTransaksi", ">=", date1)
            .where("tglTransaksi", "<=", date2)
            .onSnapshot(onResult, onError)
        return () => subscriber();
    }, [route])


    const [dataPenjualan, setdataPenjualan] = useState([])
    function onResult(QuerySnapshot) {

        let data = [];
        QuerySnapshot.docs.map((doc) => {
            data.push({ id: doc._ref._documentPath._parts[1], ...doc._data })

        })
        // console.log(data.dataBarang)
        setdataPenjualan(data)

        // console.log(data)
    }

    function onError(error) {
        console.error(error);
    }
    useEffect(() => {
        createRow()
    }, [dataPenjualan])

    const getjumlahPembayaran = (data, biaya) => {
        console.log(biaya)
        if (data.length > 0) {

            return data.reduce((a, b) => {
                return a + (b.jumlah * b.hargaProduk);
            }, 0) + biaya;
        } else {
            return 0 + biaya
        }
    }
    const getTotal = () => {
        let total = 0;
        dataPenjualan.map((item, index) => {
            total += getjumlahPembayaran(item.dataBarang, item.voucher.biaya)
        })
        return total;
    }

    const [modalDetailCustomer, setmodalDetailCustomer] = useState(false)
    const [trxSelected, settrxSelected] = useState({})
    const detailHanler = item => {
        settrxSelected(item)
        setmodalDetailCustomer(true)
    }
    // const filterByDate = () => {

    //     return dataPenjualan.filter(item => {
    //         // console.log(ArhielTglLessTime(tanggal))
    //         // console.log(ArhielTglLessTime(item.tglTransaksi.toDate()))
    //         return ArhielTglLessTime(item.tglTransaksi.toDate()) === ArhielTglLessTime(tanggal)
    //     })
    // }
    const kembali = () => {
        navigation.navigate('laporan')
    }


    const donwload = async () => {
        let options = {
            html: `<div style="text-align:center">
                    <h1Ines Beauty Clinic</h1>
                    <h1>Data ${ArhielTglWithDay(tanggal)}</h1>
                        <table style="border-spacing:0; width:100%">
                        <thead>
                            <tr>
                                <th style="padding:10; text-align:center; border: 1px solid;">Waktu Transaksi</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Nama</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Alamat</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">No. Hp</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Skincare</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Tindakan</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Jumlah Transaksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowpdf}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="6" style="padding:10; text-align:right; border: 1px solid;">Total</td>
                                <td style="padding:10; text-align:right; border: 1px solid;">${Rp(getTotal(), true)}</td>
                            </tr>
                        </tfoot>
                    </table></div>`,
            fileName: 'Data',
            directory: 'Documents',
            width: 792,
            height: 612,
        };
        let file = await RNHTMLtoPDF.convert(options)
        FileViewer.open(file.filePath) // absolute-path-to-my-local-file.
            .then(() => {
                // success
            })
            .catch((error) => {
                // error
            });
    }
    return (
        <Provider>
            <DetailTransaksi data={trxSelected} visible={[modalDetailCustomer, setmodalDetailCustomer]} />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 }}>

                    <TouchableOpacity onPress={kembali} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='arrow-left' color='#ff6600' size={25} />
                        <Text style={{ fontWeight: 'bold', color: '#FF6600', marginLeft: 10, fontSize: 17 }}>Kembali</Text>
                    </TouchableOpacity>
                    {
                        dataPenjualan.length === 0 ?
                            null :

                            <Button icon="download" onPress={donwload} color='#777777' mode='text'>Download</Button>
                    }
                </View>

                <DataTable style={{ margin: 20, width: Dimensions.get('window').width - 40, flex: 1 }}>
                    <DataTable.Header style={{ backgroundColor: '#FFFFFF' }}>
                        <DataTable.Title>Waktu Transaksi</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >Nama</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >Alamat</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >Nomor HP</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >Skincare</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >Tindakan</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>Jumlah Transaksi</DataTable.Title>
                    </DataTable.Header>
                    <ScrollView style={{ backgroundColor: '#FFFFFF' }}>

                        {
                            dataPenjualan.map((item, index) => {
                                const tgl = ArhielTgl(item.tglTransaksi.toDate())
                                const oddeven = index % 2;
                                // const dataBarang 
                                let namaProduk = ""
                                item.dataBarang.map((barang, indexbarang) => {
                                    namaProduk += barang.namaProduk + " "
                                })

                                return <TouchableOpacity key={index} onPress={() => detailHanler(item)}>
                                    <DataTable.Row style={{ backgroundColor: oddeven === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                                        <DataTable.Cell>{tgl}</DataTable.Cell>
                                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >{item.customer.namaCustomer}</DataTable.Cell>
                                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >{item.customer.alamatCustomer}</DataTable.Cell>
                                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >{item.customer.hpCustomer}</DataTable.Cell>
                                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >{namaProduk}</DataTable.Cell>
                                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >{item.voucher.tindakan}</DataTable.Cell>
                                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'flex-end' }} numeric>{Rp(getjumlahPembayaran(item.dataBarang, item.voucher.biaya), true)}</DataTable.Cell>

                                    </DataTable.Row>
                                </TouchableOpacity>
                            })
                        }
                    </ScrollView>
                    <DataTable.Row key={0} style={{ backgroundColor: '#FFFFFF' }}>
                        <DataTable.Cell>Total</DataTable.Cell>
                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'flex-end', fontWeight: 'bold' }} numeric>{Rp(getTotal(), true)}</DataTable.Cell>
                    </DataTable.Row>


                </DataTable>
            </View>
        </Provider>
    )
}

export default LaporanTablet

const styles = StyleSheet.create({})
