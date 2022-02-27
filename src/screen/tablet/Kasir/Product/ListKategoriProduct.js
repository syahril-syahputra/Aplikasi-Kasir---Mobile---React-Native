import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ListKategoriProduct = props => {
    const item = props.item
    return (
        <TouchableOpacity onPress={() => props.onPress(item)} style={{backgroundColor:(props.selected ? '#FFFFFF' : '#DDDDDD'), minWidth:100, padding:15, alignItems:'center', marginRight:10, marginVertical:10, borderRadius:20}}>
            {/* <Icon size={25} style={{marginBottom:15, marginTop:5}} name={props.icon} color="#777777" /> */}
            <Avatar.Text size={50} label={item.namaKategori.charAt(0)} color='#FFFFFF' backgroundColor='#999999' />
            <Text style={{fontSize:12, fontWeight:'bold', marginTop:10}}>{item.namaKategori}</Text>
        </TouchableOpacity>
    )
}

export default ListKategoriProduct

const styles = StyleSheet.create({})
