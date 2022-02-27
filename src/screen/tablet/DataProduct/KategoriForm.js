import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'

import { Button, Modal, Provider, Portal } from 'react-native-paper'
import { Searchbar, Title } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import firestore from '@react-native-firebase/firestore'
import ListKategori from './ListKategori'

const kategoriProdukCollection = firestore().collection('kategoriProduk');

const KategoriForm = props => {
    const [modalAdd, setmodalAdd] = props.modalAdd

    const [dataKategori, setdataKategori] = useState([])
    const [selectedKategori, setselectedKategori] = props.selectedKategori

    useEffect(() => {
        firestore().collection('kategoriProduk').onSnapshot(onResult, onError);
    }, [])
    function onResult(QuerySnapshot) {

        let data = [];
        QuerySnapshot.docs.map((doc) => {
            data.push({ id: doc._ref._documentPath._parts[1], ...doc._data })

        })
        setdataKategori(data)
        // console.log(data)
    }

    function onError(error) {
        console.error(error);
    }

    const [searchText, setsearchText] = useState("")
    const filter = () => {
        return dataKategori.filter(item => 
            item.namaKategori.toLowerCase().includes(searchText.toLowerCase()) ||
            item.deskripsiKategori.toLowerCase().includes(searchText.toLowerCase())
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Title style={{ textAlign: 'left', color: '#666666', fontSize: 16 }}>Kategori Produk</Title>
            <Searchbar value={searchText} onChangeText={text=> setsearchText(text)} clearIcon={() => <Icon name='cancel' size={25} color={'#000000'} />} style={{ elevation:0, borderBottomColor:'#DDDDDD', borderBottomWidth:2 }} inputStyle={{ padding: 0, color: '#777777' }} placeholder='Cari Kategori' />

            <FlatList
                style={{ flex: 1, backgroundColor: '#FDFDFD' }}
                data={filter()}                
                extraData={selectedKategori}
                
                renderItem={({ item }) => <ListKategori selected={selectedKategori} onPress={() => { setselectedKategori(item) }} item={item} />} />
            <Button onPress={() => { setmodalAdd(true) }} icon="camera" color='#FF6600' mode="text" style={{ margin: 10 }}>
                Tambah Kategori
            </Button>
        </View>
    )
}

export default KategoriForm

const styles = StyleSheet.create({})
