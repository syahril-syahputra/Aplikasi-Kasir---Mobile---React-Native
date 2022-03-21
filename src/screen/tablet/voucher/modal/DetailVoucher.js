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
        }
    }, [visible])
    function onResult(QuerySnapshot) {

        let data = [];
        QuerySnapshot.docs.map((doc) => {
            data.push({ id: doc._ref._documentPath._parts[1], ...doc._data.voucher, tgl: doc._data.tglTransaksi })

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
                                    <Title style={styles.title}>Kode Customer</Title>
                                    <Text>{item.kodeCustomer}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Nama Customer</Title>
                                    <Text>{item.namaCustomer}</Text>
                                </View>

                                <View>
                                    <Title style={styles.title}>Umur Customer</Title>
                                    <Text>{item.umurCustomer}</Text>
                                </View>

                                <View>
                                    <Title style={styles.title}>Jenis Kelamin Customer</Title>
                                    <Text>{item.jenisKelamin}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Pekerjaan Customer</Title>
                                    <Text>{item.pekerjaanCustomer}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Alamat Customer</Title>
                                    <Text>{item.alamatCustomer}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>No. HP Customer</Title>
                                    <Text>{item.hpCustomer}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#EEEEEE', padding: 1, marginLeft: 20 }}>
                                <DataTable style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <DataTable.Header style={{ backgroundColor: '#FFFFFF' }}>
                                        <DataTable.Title>No</DataTable.Title>
                                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >Tanggal</DataTable.Title>
                                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >Tindakan</DataTable.Title>
                                        <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >Catatan</DataTable.Title>
                                    </DataTable.Header>
                                    <ScrollView style={{ backgroundColor: '#DDDDDD', width:'100%' }}>

                                        {
                                            dataVoucher.map((item, index) => {
                                                const tgl = ArhielTglLessTime(item.tgl.toDate())
                                                const oddeven = index % 2;


                                                return (
                                                    <DataTable.Row style={{ backgroundColor: oddeven === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                                                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                                                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }}>{tgl}</DataTable.Cell>
                                                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >{item.tindakan}</DataTable.Cell>
                                                        <DataTable.Cell style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} >{item.catatan}</DataTable.Cell>

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
                                    Print Voucher
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
