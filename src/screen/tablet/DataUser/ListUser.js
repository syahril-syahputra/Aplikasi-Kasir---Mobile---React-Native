import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Avatar, Title } from 'react-native-paper'

const ListUser = props => {
    const item = props.item
    return (
        <TouchableOpacity onPress={() => props.onPress(item)} style={{ padding: 10, margin: 10, borderRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'center' }}>
            {
                item.fotoUser.url === "" ?
                <Avatar.Icon size={70} style={{ backgroundColor: '#777777' }} color='#FFFFFF' icon="account" />
                :
                <Avatar.Image size={70} style={{ backgroundColor: '#FF6600' }} source={{ uri: item.fotoUser.url }} />


            }
            <View style={{ alignItems: 'center', minWidth: 150 }}>
                <Title style={{ color: '#777777', fontSize: 17, textAlign: 'center' }}>{item.namaUser}</Title>
                <Text style={{ color: '#777777', fontSize: 14, textAlign: 'center' }}>{item.emailUser}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ListUser

const styles = StyleSheet.create({})
