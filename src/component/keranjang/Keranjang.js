import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Tombol from '../../Arhiel/component/Tombol'
import DaftarKeranjang from './DaftarKeranjang'

const Keranjang = () => {
    
    return (
        <View style={{flex:1, paddingVertical:20, paddingHorizontal:10}}>
            <DaftarKeranjang />
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:20}}>
                <Text style={{fontWeight:'bold', fontSize:17, color:'#777777'}}>Total Belanja</Text>
                <Text style={{fontWeight:'bold', fontSize:17, color:'#777777'}}>Rp 900.000</Text>
            </View>
            <Tombol title="Simpan" />
        </View>
    )
}

export default Keranjang

const styles = StyleSheet.create({})
