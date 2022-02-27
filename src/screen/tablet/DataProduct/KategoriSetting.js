import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Title } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'

const KategoriSetting = props => {
    const item = props.item
    return (
        <View style={{ backgroundColor: '#FFFFFF', flexDirection: 'row', paddingBottom:10, paddingHorizontal: 10, borderRadius: 10 }}>
            <View style={{ flex: 1 }}>
                <Title style={{ fontSize: 14 }}>Nama Kategori</Title>
                <Text>{item.namaKategori}</Text>
                <Title style={{ fontSize: 14 }}>Deskripsi Kategori</Title>
                <Text>{item.deskripsiKategori}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Button onPress={() => props.editKategori(true)} icon="file-document-edit" mode="text">
                    Edit 
                </Button>
                <Button onPress={() => props.deleteKategori(true)} icon="delete" mode="text" color="#FF0000">
                    Hapus
                </Button>
            </View>
        </View>
    )
}

export default KategoriSetting

const styles = StyleSheet.create({})
