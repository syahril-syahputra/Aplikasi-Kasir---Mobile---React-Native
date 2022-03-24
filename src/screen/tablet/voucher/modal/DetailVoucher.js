import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { Portal, Modal, Title, Button, ActivityIndicator, DataTable } from 'react-native-paper'
import { Rp } from '../../../../function/Rupiah'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { ArhielTgl, ArhielTglLessTime } from '../../../../function/ArhielTgl'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";

const DetailVoucher = props => {
    const [visible, setVisible] = props.visible
    const item = props.customer
    const [onLoading, setonLoading] = useState(false)
    const [dataVoucher, setdataVoucher] = useState([])

    useEffect(() => {
        if (visible) {
            firestore()
                .collection('penjualan')
                .where("customer.id", "==", item.id)
                .onSnapshot(onResult, onError);
        }else
        {
            setdataVoucher([])
        }
    }, [visible])
    function onResult(QuerySnapshot) {

        let data = [];
        QuerySnapshot.docs.map((doc) => {
            data.push({ id: doc._ref._documentPath._parts[1], ...doc._data.voucher, tgl: doc._data.tglTransaksi, dataBarang: doc._data.dataBarang })

        })
        setdataVoucher(data)
        // console.log(data)
    }

    function onError(error) {
        console.error(error);
    }

    // const [rowpdf, setrowpdf] = useState("")

    const createRowPDF = () => {
        let temprow = "";
        dataVoucher.map((item, index) => {
            const tgl = ArhielTgl(item.tgl.toDate())


            temprow += `<tr>
                            <td style="padding:5px; border: 1px solid;">${index + 1}</td>
                            <td style="padding:5px; text-align:left; border: 1px solid;">${tgl}</td>
                            <td style="padding:5px; text-align:left; border: 1px solid;">${item.tindakan}</td>
                            <td style="padding:5px; text-align:left; border: 1px solid;">${item.catatan || ""}</td>
                        </tr>`


        })
        return temprow

    }
    const donwload = async () => {
        let options = {
            html: `<div style="text-align:center">
            <h1>Ines Beuty Clinic</h1>
                    <h1>Data Pasien</h1>

                        <table>
                            <tr>
                                <td style="padding:10">Nomor Urut</td>
                                <td style="padding:10">${item.kodeCustomer}</td>
                            </tr>
                            <tr>
                                <td style="padding:10">Nama Pasien</td>
                                <td style="padding:10">${item.namaCustomer}</td>
                            </tr>
                            <tr>
                                <td style="padding:10">Umur / Tanggal Lahir</td>
                                <td style="padding:10">${item.umurCustomer}</td>
                            </tr>
                            <tr>
                                <td style="padding:10">Jenis Kelamin</td>
                                <td style="padding:10">${item.jenisKelamin}</td>
                            </tr>
                            <tr>
                                <td style="padding:10">Alamat</td>
                                <td style="padding:10">${item.alamatCustomer}</td>
                            </tr>
                            <tr>
                                <td style="padding:10">Pekerjaan</td>
                                <td style="padding:10">${item.pekerjaanCustomer}</td>
                            </tr>
                            <tr>
                                <td style="padding:10">Nomor Telepon</td>
                                <td style="padding:10">${item.hpCustomer}</td>
                            </tr>
                        </table>
                        <table style="border-spacing:0; width:100%">
                        <thead>
                            <tr>
                                <th style="padding:10; text-align:center; border: 1px solid;">No</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Tanggal</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Tindakan</th>
                                <th style="padding:10; text-align:center; border: 1px solid;">Catatan</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${createRowPDF()}
                        </tbody>
                        
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
    const deleteVoucher = async (id, data) => {
        // console.log(data)
        await firestore()
            .collection('penjualan')
            .doc(id)
            .update({voucher : {nomorVoucher : '', biaya : data.biaya, catatan : data.catatan, tindakan : data.tindakan }})
    }
    const printVoucher = async (data) => {
        // console.log(data)
        let tempbarang = data.tindakan + " + ";
        let total = 0;
        data.dataBarang.map((d, i) => {
            tempbarang += d.namaProduk + " "
            total = total + (d.hargaProduk * d.jumlah)
        })
        tempbarang = tempbarang + " Total " + Rp(total + data.biaya)
        // console.log(tempbarang)
        let options = {
            html: `<div style="text-align:center">
                    <h1>Ines Beuty Clinic</h1>
                    <h1>Voucher</h1>

                        <table style="border-spacing:0; width:100%">
                            <tr>
                                <td style="padding:5px; border: 1px solid;">Nama</td>
                                <td style="padding:5px; text-align:left; border: 1px solid;">${data.nomorVoucher}</td>
                            </tr>
                            <tr>
                                <td style="padding:5px; border: 1px solid;">Nama</td>
                                <td style="padding:5px; text-align:left; border: 1px solid;">${item.namaCustomer}</td>
                            </tr>
                            <tr>
                                <td  style="padding:5px; border: 1px solid;">Alamat</td>
                                <td  style="padding:5px; text-align:left; border: 1px solid;">${item.alamatCustomer}</td>
                            </tr>
                            <tr>
                                <td  style="padding:5px; border: 1px solid;">Telepon</td>
                                <td style="padding:5px; text-align:left; border: 1px solid;">${item.hpCustomer}</td>
                            </tr>
                            <tr>
                                <td  style="padding:5px; border: 1px solid;">Tindakan / Skincare</td>
                                <td style="padding:5px; text-align:left; border: 1px solid;">${tempbarang}</td>
                            </tr>
                            
                        </table>
                        </div>`,
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
        <Portal style={styles.portal}>
            <Modal visible={visible} dismissable={false} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 50, alignSelf: 'center', padding: 20 }}>

                {
                    item ?
                        <View style={{ flexDirection: 'row', width: 800, alignItems: 'center', alignItems: 'flex-start' }}>
                            {/* {
                                item.fotoCustomer.url === "" ?
                                    <View>
                                        <Icon name="account" size={200} color={"#FFFFFF"} style={{backgroundColor:'#AAAAAA', marginRight: 10, borderRadius: 10}}/>
                                    </View>
                                    :
                                    <Image source={{ uri: item.fotoCustomer.url }} style={{ backgroundColor: '#EEEEEE', marginRight: 10, borderRadius: 10, resizeMode: 'contain' }} width={200} height={200} />

                            } */}

                            <View>
                                <View>
                                    <Title style={styles.title}>Kode Pasien</Title>
                                    <Text>{item.kodeCustomer}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Nama Pasien</Title>
                                    <Text>{item.namaCustomer}</Text>
                                </View>

                                <View>
                                    <Title style={styles.title}>Umur Pasien</Title>
                                    <Text>{item.umurCustomer}</Text>
                                </View>

                                <View>
                                    <Title style={styles.title}>Jenis Kelamin Pasien</Title>
                                    <Text>{item.jenisKelamin}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Pekerjaan Pasien</Title>
                                    <Text>{item.pekerjaanCustomer}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Alamat Pasien</Title>
                                    <Text>{item.alamatCustomer}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>No. HP Pasien</Title>
                                    <Text>{item.hpCustomer}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#EEEEEE', padding: 1, marginLeft: 20 }}>
                                <DataTable style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <DataTable.Header style={{ backgroundColor: '#FFFFFF' }}>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'center', alignItems: 'center' }}><Text>No</Text></View>
                                        <View style={{ flex: 2, padding: 5, borderLeftWidth: 1, borderColor: '#DDDDDD', alignItems: 'center', justifyContent: 'center' }}><Text>Nomor Voucher</Text></View>
                                        <View style={{ flex: 2, padding: 5, borderLeftWidth: 1, borderColor: '#DDDDDD', alignItems: 'center', justifyContent: 'center' }}><Text>Tanggal</Text></View>
                                        <View style={{ flex: 3, padding: 5, borderLeftWidth: 1, borderColor: '#DDDDDD', alignItems: 'center', justifyContent: 'center' }}><Text>Tindakan</Text></View>
                                        <View style={{ flex: 3, padding: 5, borderLeftWidth: 1, borderColor: '#DDDDDD', alignItems: 'center', justifyContent: 'center' }}><Text>Catatan</Text></View>
                                        <View style={{ flex: 6, borderLeftWidth: 1, borderColor: '#DDDDDD', alignItems: 'center', justifyContent: 'center' }}><Text></Text></View>
                                    </DataTable.Header>
                                    <ScrollView style={{ backgroundColor: '#DDDDDD', width: '100%' }}>

                                        {
                                            dataVoucher.map((item, index) => {
                                                const tgl = ArhielTglLessTime(item.tgl.toDate())
                                                const oddeven = index % 2;


                                                return (
                                                    <DataTable.Row key={index} style={{ backgroundColor: oddeven === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                                                        <View style={{ flex: 1, padding: 5, justifyContent: 'center', alignItems: 'center', justifyContent:'center'}}><Text>{index + 1}</Text></View>
                                                        <View style={{ flex: 2, padding: 5, borderLeftWidth: 1, borderColor: '#DDDDDD', alignItems: 'center', justifyContent:'center'}}><Text style={{color:item.nomorVoucher === '' ? "red" : 'green'}}>{item.nomorVoucher === '' ? "Expired" : item.nomorVoucher}</Text></View>
                                                        <View style={{ flex: 2, padding: 5, borderLeftWidth: 1, borderColor: '#DDDDDD', alignItems: 'center', justifyContent:'center'}}><Text>{tgl}</Text></View>
                                                        <View style={{ flex: 3, padding: 5, borderLeftWidth: 1, borderColor: '#DDDDDD', alignItems: 'center', justifyContent:'center'}} ><Text>{item.tindakan}</Text></View>
                                                        <View style={{ flex: 3, padding: 5, borderLeftWidth: 1, borderColor: '#DDDDDD', alignItems: 'center', justifyContent:'center'}} ><Text>{item.catatan}</Text></View>
                                                        <View style={{ flex: 6, borderLeftWidth: 1, borderColor: '#DDDDDD', alignItems: 'center', flexDirection: 'row' }} >

                                                            <Button icon="printer" color="#5f6bff" mode="outlined" onPress={() => printVoucher(item)}>
                                                                Print
                                                            </Button>
                                                            <Button icon="delete" color="red" mode="outlined" onPress={() => deleteVoucher(item.id, item)}>
                                                                Delete
                                                            </Button>
                                                        </View>
                                                    </DataTable.Row>)
                                            })
                                        }
                                    </ScrollView>
                                </DataTable>
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
                                <Button icon="pencil" color="#5f6bff" mode="text" onPress={donwload}>
                                    Print Data Pasien
                                </Button>

                            </View>
                        </View>
                }
            </Modal>
        </Portal>
    )
}

export default DetailVoucher

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: '#777777'
    }
})
