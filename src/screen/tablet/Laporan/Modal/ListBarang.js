import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Title } from 'react-native-paper'
import { Rp } from '../../../../function/Rupiah'

const ListBarang = props => {
    const item = props.item
    return (
        <View style={{ backgroundColor: '#FFFFFF', marginBottom: 1, alignItems:'center', flexDirection: 'row', padding: 10 }}>
            <Avatar.Image source={{ uri: item.gambarProduk.url }} />
            <View style={{flex:1, marginHorizontal:10}}>

                <Text style={{fontSize:14, fontWeight:'bold', color:'#777777', marginBottom:0}}>{item.namaProduk}</Text>
                <Text style={{fontSize:12, color:'#777777', marginBottom:0}}>{item.kodeProduk}</Text>
                <Text style={{fontSize:14, color:'#777777', marginBottom:0}}>{Rp(item.hargaProduk, true)}  x {item.jumlah}</Text>
                
            </View>
            <Text style={{fontWeight:'bold', fontSize:14}}>{Rp(item.hargaProduk * item.jumlah, true)}</Text>
        </View>
    )
}

export default ListBarang

const styles = StyleSheet.create({})
