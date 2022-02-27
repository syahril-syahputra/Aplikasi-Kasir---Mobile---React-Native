import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import storage from '@react-native-firebase/storage';
import { Rp } from '../../../function/Rupiah';
import { Avatar, Button, DataTable } from 'react-native-paper';

const ListProduct = props => {
    const item = props.item
    const ref = storage().ref(item.id + ".jpg");


    return (
        <TouchableOpacity onPress={() => props.onPress(item)} style={{flex:1, margin:5, borderRadius:10, overflow:'hidden', backgroundColor: '#FFFFFF', borderRadius: 10, borderColor: '#EEEEEE' }}>
            <View style={{alignItems:'center'}}>
                <Image style={{width:'100%', backgroundColor:'#FAFAFA', resizeMode:'contain', height: 120 }} source={{ uri: item.gambarProduk.url }} />
                <View style={{alignItems:'center', paddingVertical:10, paddingHorizontal:10}}>
                    <Text style={{fontWeight:'bold', textAlign:'center'}}>{item.namaProduk}</Text>
                    <Text style={{fontSize:11, textAlign:'center'}}>{item.kodeProduk}</Text>
                    <Text style={{minWidth:120, color:'#FF6600', marginTop:10, textAlign:'center'}}>{Rp(item.hargaProduk, true)}</Text>
                </View>
            </View>
        </TouchableOpacity>
        
    )
}

export default ListProduct

const styles = StyleSheet.create({})
