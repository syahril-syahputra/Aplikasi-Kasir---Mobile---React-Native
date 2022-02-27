import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar, Title } from 'react-native-paper'

const ListCustomer = props => {
    const item = props.item
    return (
        <TouchableOpacity onPress={() => props.onPress(item)} style={{ flexDirection: 'row', marginVertical:5, borderRadius:10, marginHorizontal:10, padding: 10, alignItems:'center', backgroundColor:'#F4F4F4' }}>
            {
                item.fotoCustomer.url === "" ?
                    <Avatar.Icon size={50} style={{ backgroundColor: '#777777' }} color='#FFFFFF' icon="account" />
                    :
                    <Avatar.Image size={50} style={{ backgroundColor: '#FF6600' }} source={{ uri: item.fotoCustomer.url }} />


            }
            <View style={{marginLeft:10}}>

                <Text style={{fontSize:17, color:'#777777', fontWeight:'bold'}}>{item.namaCustomer}</Text>
                <Text style={{fontSize:14, color:'#777777'}}>{item.hpCustomer}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ListCustomer

const styles = StyleSheet.create({})
