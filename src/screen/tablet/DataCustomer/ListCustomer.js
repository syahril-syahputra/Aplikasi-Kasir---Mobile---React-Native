import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Avatar, Title } from 'react-native-paper'

const ListCustomer = props => {
    const item = props.item
    return (
        <TouchableOpacity onPress={() => props.onPress(item)} style={{ padding: 10, margin: 10, borderRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'center' }}>
            {
                item.fotoCustomer.url === "" ?
                <Avatar.Icon size={70} style={{ backgroundColor: '#777777' }} color='#FFFFFF' icon="account" />
                :
                <Avatar.Image size={70} style={{ backgroundColor: '#FF6600' }} source={{ uri: item.fotoCustomer.url }} />


            }
            <View style={{ alignItems: 'center', minWidth: 150 }}>
                <Title style={{ color: '#777777', fontSize: 17, textAlign: 'center' }}>{item.namaCustomer}</Title>
                <Text style={{ color: '#777777', fontSize: 14, textAlign: 'center' }}>{item.hpCustomer}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ListCustomer

const styles = StyleSheet.create({})
