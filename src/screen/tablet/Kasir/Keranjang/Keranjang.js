import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DaftarKeranjang from './DaftarKeranjang'
import { keranjangContext } from '../../Kasir'
import { Rp } from '../../../../function/Rupiah'
import { Button } from 'react-native-paper'

const Keranjang = props => {

    const [data, dispatch] = useContext(keranjangContext)

    const [jumlahBelanja, setjumlahBelanja] = useState(0)

    const getjumlah = () => {
        if (data.length > 0) {

            return data.reduce((a, b) => {
                return a + (b.jumlah * b.hargaProduk);
            }, 0);
        } else {
            return 0
        }
    }
    useEffect(() => {

        // const jumlah =  data.reduce( function(a, b){
        //     return a + (b.jumlah * b.hargaProduk);
        // }, 0);
        setjumlahBelanja(getjumlah())
        // console.log(getjumlah())
    }, [data])
    const [modalPilihPelanggan, setmodalPilihPelanggan] = props.modalInputVoucher
    const nextHandler = () => {
        setmodalPilihPelanggan(true)
    }
    return (
        <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10 }}>
            <DaftarKeranjang />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#777777' }}>Total Belanja</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#777777' }}>{Rp(jumlahBelanja, true)}</Text>
            </View>
            <Button onPress={nextHandler} icon='plus' mode='contained' color='#FF6600' dark={true}>Lanjut Transaksi</Button>
        </View>
    )
}

export default Keranjang

const styles = StyleSheet.create({})
