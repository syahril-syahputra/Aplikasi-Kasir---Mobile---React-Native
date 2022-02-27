import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Rp } from '../../function/Rupiah'

const ListProduct = props => {

    const item = props.item
    const gambar = item.gambar
    const nama = item.nama
    const harga = item.harga
    return (
        <View style={{backgroundColor:'#FFFFFF',alignItems:'center', borderRadius:20, padding:10, margin:10}}>
            <Image style={{width:110, height:80}} source={gambar} />
            <Text style={{fontWeight:'bold', color:'#777777', marginBottom:10, marginTop:10}}>{nama}</Text>
            <Text style={{fontSize:13, fontWeight:'bold', color:'#FF6600'}}>{Rp(harga, true)}</Text>
        </View>
    )
}

export default ListProduct

const styles = StyleSheet.create({})
