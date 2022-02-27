import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext } from 'react'

import TextBox from '../../../../Arhiel/component/TextBox'
import { Portal, Modal, Searchbar, Button, ActivityIndicator, Title, Snackbar } from 'react-native-paper'
import TextArea from '../../../../Arhiel/component/TextArea'
import { voucherContext } from '../../Kasir'
import TextBoxRp from '../../../../Arhiel/component/TextboxRp'


const InputVoucher = props => {
    const [visible, setVisible] = props.visible
    const [data, dispatchData] = useContext(voucherContext)
    const [nomorVoucher, setnomorVoucher] = useState("")
    const [tindakan, settindakan] = useState("")
    const [biaya, setbiaya] = useState(0)
    const [onLoading, setonLoading] = useState(false)
    
    const [modalPilihPelanggan, setmodalPilihPelanggan] = props.modalPilihPelanggan
    const simpan = () => {
        
        if(nomorVoucher === "")
        {
            alert("Masukan Nomor Voucher Terlebih Dahulu")
        }else
        {
            
            dispatchData({ type: 'set', data : {
                nomorVoucher: nomorVoucher,
                tindakan: tindakan,
                biaya : parseInt(biaya),
            } })
            settindakan("")
            setnomorVoucher("")
            setbiaya(0)
            setVisible(false)
            setmodalPilihPelanggan(true)
        }
    }
    return (
        <Portal style={styles.portal}>

            <Modal dismissable={false} visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 50, alignSelf: 'center', padding: 10 }}>
                <Text style={{fontWeight:'bold', padding:10}}>Buat Voucher</Text>
                <View style={{ width: 600, flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1 }}>
                        <TextBox title="Nomor Voucher" value={nomorVoucher} onChangeText={(text) => setnomorVoucher(text)} />
                        <TextArea title="Tindakan" value={tindakan} onChangeText={(text) => settindakan(text)} />
                        <TextBoxRp title="Biaya Tindakan" value={biaya} onChangeText={(text) => setbiaya(text)} />
                        
                    </View>
                </View>
                <View>
                    {
                        onLoading ?
                           

                               
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                                    <ActivityIndicator animating={true} color={"#FF6600"} style={{ marginRight: 5 }} />
                                    <Text style={{ color: '#FF6600' }}>Loading</Text>
                                </View>
                            :

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <Button icon="close-thick" color="#FF0000" mode="text" onPress={() => {
                                    setVisible(false)
                                }}>
                                    Batal
                                </Button>
                                <Button icon="camera" mode="text" onPress={simpan}>
                                    Simpan
                                </Button>
                            </View>
                    }
                </View>

            </Modal>

        </Portal>
    )
}

export default InputVoucher

const styles = StyleSheet.create({})