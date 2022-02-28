import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import { ActivityIndicator, DataTable, Title, Button, Provider } from 'react-native-paper';
import { ArhielTgl, ArhielTglLessTime, ArhielTglWithDay } from '../../function/ArhielTgl';
import firestore from '@react-native-firebase/firestore'
import { Rp } from '../../function/Rupiah';
import { ScrollView } from 'react-native-gesture-handler';
import MonthYearPicker from '../../Arhiel/component/MonthYearPicker';
import { useNavigation } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";

const LaporanBulanan = () => {
    const navigation = useNavigation();
    const [data, setdata] = useState([])

    const [isLoading, setisLoading] = useState(true)

    const [bulan, setbulan] = useState(new Date().getMonth())
    const [tahun, settahun] = useState(new Date().getFullYear())

    var endmonth = new Date(Date.UTC(tahun, bulan + 1, 0));
    var firstmonth = new Date(Date.UTC(tahun, bulan, 1));
    const [jumlahPenjualan, setjumlahPenjualan] = useState(0)
    const [jumlahPria, setjumlahPria] = useState(0)
    const [jumlahWanita, setjumlahWanita] = useState(0)
    const [jumlahTindakan, setjumlahTindakan] = useState(0)
    const [jumlahPasienBaru, setjumlahPasienBaru] = useState(0)
    const [jumlahPasienLama, setjumlahPasienLama] = useState(0)
    const showHarian = (tgl) => {
        // const data = new Date(tahun, bulan, tgl)
        // console.log(data)
        navigation.navigate('laporanharian', { tgl, bulan, tahun })
    }
    const createValue = (angka) => {
        if (angka === null || angka === 0) {
            return <Text style={{ color: 'red' }}>0</Text>
        } else {
            return <Text style={{ color: 'green' }}>{angka}</Text>
        }
    }

    const [rowpdf, setrowpdf] = useState("")
    const createRows = datas => {
        const harian = {};
        const pria = {}
        const wanita = {}
        const jumlahtindakan = {}
        const pasienbaru = {}
        const pasienlama = {}

        let totaljumlahpria = 0
        let totaljumlahWanita = 0
        let totaljumlahtindakan = 0
        let totalpasienbaru = 0
        let totalpasienlama = 0
        datas.map((item, index) => {
            const a = item._data.dataBarang.reduce((a, b) => {
                return a + (b.jumlah * b.hargaProduk);
            }, 0) + item._data.voucher.biaya;

            // console.log(item._data.tglTransaksi.toDate())
            const tgl = item._data.tglTransaksi.toDate().getDate();

            const tanggaltrx = item._data.tglTransaksi.toDate().getFullYear() + "-" + item._data.tglTransaksi.toDate().getMonth() + "-" + item._data.tglTransaksi.toDate().getDate()
            const tglInputCustomer = item._data.customer.tglInput.toDate().getFullYear() + "-" + item._data.customer.tglInput.toDate().getMonth() + "-" + item._data.customer.tglInput.toDate().getDate()
            if (tanggaltrx === tglInputCustomer) {
                const p = pasienbaru[tgl] ? pasienbaru[tgl] : 0
                pasienbaru[tgl] = p + 1
                totalpasienbaru = totalpasienbaru + 1;
            } else {
                const p = pasienlama[tgl] ? pasienlama[tgl] : 0
                pasienlama[tgl] = p + 1
                totalpasienlama = totalpasienlama + 1;
            }


            const jumlahbefore = harian[tgl] ? harian[tgl] : 0
            harian[tgl] = jumlahbefore + a

            const jumlahTindakanBefore = jumlahtindakan[tgl] ? jumlahtindakan[tgl] : 0
            jumlahtindakan[tgl] = jumlahTindakanBefore + 1


            if (item._data.customer.jenisKelamin === "Pria") {

                const jumlahpriabefore = pria[tgl] ? pria[tgl] : 0
                pria[tgl] = jumlahpriabefore + 1
                totaljumlahpria++
            } else {
                const jumlahwanitabefore = wanita[tgl] ? wanita[tgl] : 0
                wanita[tgl] = jumlahwanitabefore + 1
                totaljumlahWanita++
            }
            totaljumlahtindakan++




        })

        setjumlahPasienLama(totalpasienlama)
        setjumlahPasienBaru(totalpasienbaru)
        setjumlahPria(totaljumlahpria)
        setjumlahWanita(totaljumlahWanita)
        setjumlahTindakan(totaljumlahtindakan)


        let no = 1;
        const tempdata = []
        let temprow = "";
        let jumlah = 0;
        for (var d = firstmonth; d <= endmonth; d.setDate(d.getDate() + 1)) {
            // console.log('a')
            const oddeven = no % 2;
            const getDate = d.getDate()
            jumlah += harian[getDate] || 0
            tempdata.push(
                <TouchableOpacity onPress={() => showHarian(getDate)} key={no}>

                    <DataTable.Row style={{ backgroundColor: oddeven === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                        <DataTable.Cell>{ArhielTglWithDay(d)}</DataTable.Cell>
                        <DataTable.Cell style={{ alignItems: 'center', borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{createValue(pria[getDate] || 0)}</DataTable.Cell>
                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{createValue(wanita[getDate] || 0)}</DataTable.Cell>
                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{createValue(jumlahtindakan[getDate] || 0)}</DataTable.Cell>
                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{createValue(pasienbaru[getDate] || 0)}</DataTable.Cell>
                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{createValue(pasienlama[getDate] || 0)}</DataTable.Cell>
                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'flex-end' }} numeric>{Rp(harian[getDate] || 0, true)}</DataTable.Cell>
                    </DataTable.Row>
                </TouchableOpacity>
            )
            console.log(pria[getDate] || 0)
            temprow += `<tr>
                            <td style="padding:5px; border: 1px solid;">${ArhielTglWithDay(d)}</td>
                            <td style="padding:5px; text-align:center; border: 1px solid;">${pria[getDate] || 0}</td>
                            <td style="padding:5px; text-align:center; border: 1px solid;">${wanita[getDate] || 0}</td>
                            <td style="padding:5px; text-align:center; border: 1px solid;">${jumlahtindakan[getDate] || 0}</td>
                            <td style="padding:5px; text-align:center; border: 1px solid;">${pasienbaru[getDate] || 0}</td>
                            <td style="padding:5px; text-align:center; border: 1px solid;">${pasienlama[getDate] || 0}</td>
                            <td style="padding:5px; text-align:right; border: 1px solid;">${Rp(harian[getDate] || 0, true)}</td>
                        </tr>`

            no++;
        }
        setjumlahPenjualan(jumlah)
        setrowpdf(temprow)
        setdata(tempdata)
        setisLoading(false)
    }

    const refresh = () => {
        setisLoading(true)
        firestore()
            .collection('penjualan')
            .where('tglTransaksi', '>=', firstmonth)
            .where('tglTransaksi', '<=', endmonth)
            .get()
            .then(response => {
                createRows(response._docs)
                // response._docs.map((item, index) => {
                //     console.log(item._data)
                // })
            })
    }
    const download = async () => {

        let options = {
            html: `<div style="text-align:center">
                    <h1>Data Bulan ${bulan + 1} Tahun ${tahun}</h1>
                        <table style="border-spacing:0; width:100%">
                        <thead>
                            <tr>
                                <th style="padding:10; text-align:center; border: 1px solid;">Tanggal</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Pria</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Wanita</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Jumlah Tindakan</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Pasien Baru</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Pasien Lama</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Jumlah Transaksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowpdf}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td style="padding:10; text-align:center; border: 1px solid;">Total</td>
                                <td style="padding:10; text-align:center; border: 1px solid;">${jumlahPria}</td>
                                <td style="padding:10; text-align:center; border: 1px solid;">${jumlahWanita}</td>
                                <td style="padding:10; text-align:center; border: 1px solid;">${jumlahTindakan}</td>
                                <td style="padding:10; text-align:center; border: 1px solid;">${jumlahPasienBaru}</td>
                                <td style="padding:10; text-align:center; border: 1px solid;">${jumlahPasienLama}</td>
                                <td style="padding:10; text-align:right; border: 1px solid;">${Rp(jumlahPenjualan, true)}</td>
                            </tr>
                        </tfoot>
                    </table></div>`,
            fileName: 'Data',
            directory: 'Documents',
            width: 792,
            height: 612,
        };
        let file = await RNHTMLtoPDF.convert(options)
        const path = FileViewer.open(file.filePath) // absolute-path-to-my-local-file.
            .then(() => {
                // success
            })
            .catch((error) => {
                // error
            });
        // alert(file.filePath);
        //         const android = RNFetchBlob.android;
        // android.actionViewIntent(path, 'application/pdf');
        //         setsource(file.filePath)
        //         setmodalPdf(true)

    }
    useEffect(() => {
        refresh()
    }, [bulan, tahun])

    return (
        <Provider>
            <View style={{ flex: 1 }}>
                <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#DDDDDD' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#777777', fontSize: 20, marginRight: 10, fontWeight: 'bold', marginBottom: 10 }}>Pilih Periode : </Text>
                        <MonthYearPicker bulan={bulan} tahun={tahun} onChange={(bulan, tahun) => { setbulan(bulan); settahun(tahun) }} startYear={2021} />
                    </View>
                    {!isLoading ?
                        <View style={{flexDirection:'row'}}>
                            <Button icon="cloud-refresh" onPress={() => refresh()} color='#777777' mode='text'>Refresh</Button>
                            <Button icon="download" onPress={() => download()} color='#777777' mode='text'>Download</Button>

                        </View> : null
                    }
                </View>
                <DataTable style={{ margin: 20, width: Dimensions.get('window').width - 40, flex: 1 }}>
                    <DataTable.Header style={{ backgroundColor: '#f0f0f0', borderTopColor: '#DDDDDD', borderTopWidth: 1 }}>
                        <DataTable.Title>Tanggal</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }}>Pria</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }}>Wanita</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }}>Jumlah Tindakan</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }}>Pasien Baru</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }}>Pasien Lamat</DataTable.Title>
                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>Jumlah Transaksi</DataTable.Title>
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
                    {
                        isLoading ?
                            null
                            :
                            <DataTable.Row key={0} style={{ backgroundColor: '#f0f0f0' }}>
                                <DataTable.Cell>Total</DataTable.Cell>
                                <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{jumlahPria}</DataTable.Cell>
                                <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{jumlahWanita}</DataTable.Cell>
                                <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{jumlahTindakan}</DataTable.Cell>
                                <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{jumlahPasienBaru}</DataTable.Cell>
                                <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{jumlahPasienLama}</DataTable.Cell>
                                <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'flex-end' }} numeric>{Rp(jumlahPenjualan, true)}</DataTable.Cell>
                            </DataTable.Row>


                    }
                </DataTable>

            </View>
        </Provider>
    )
}

export default LaporanBulanan

const styles = StyleSheet.create({
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})
