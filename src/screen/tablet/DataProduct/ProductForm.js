import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, Text, View } from 'react-native'
import { Button, DataTable, Searchbar, Title } from 'react-native-paper'
import KategoriSetting from './KategoriSetting'
import Icon from 'react-native-vector-icons/FontAwesome5'
import firestore from '@react-native-firebase/firestore'
import { ScrollView } from 'react-native-gesture-handler'
import ListProduct from './ListProduct'

const ProductForm = props => {
    const kategori = props.selectedKategori
    const [modalDeleteKategori, setmodalDeleteKategori] = props.modalDeleteKategori
    const [modalEditKategori, setmodalEditKategori] = props.modalEditKategori
    const [modalAdd, setmodalAdd] = props.modalAdd
    const [modalDetail, setmodalDetail] = props.modalDetail
    const [textCari, settextCari] = useState("")

    const showDetailProduct = (product) => {
        setmodalDetail(true)
        props.setSelectedProduct(product)
    }

    const [dataProduk, setdataProduk] = useState([])

    useEffect(() => {
        firestore().collection('produk').onSnapshot(onResult, onError);
    }, [])

    function onResult(QuerySnapshot) {

        let data = [];
        QuerySnapshot.docs.map((doc) => {
            data.push({ id: doc._ref._documentPath._parts[1], ...doc._data })

        })
        setdataProduk(data)
        console.log(data)
    }

    function onError(error) {
        console.error(error);
    }
    const bykategori = () => {
        const bykategori = dataProduk.filter(item => item.kategori === kategori.id)
        return bykategori.filter(item => 
            item.namaProduk.toLowerCase().includes(textCari.toLowerCase())
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Title style={{ textAlign: 'left', color: '#666666', fontSize: 16 }}>Daftar Produk</Title>
            {
                kategori.id ?
                    <KategoriSetting editKategori={setmodalEditKategori} deleteKategori={setmodalDeleteKategori} item={kategori} />
                    :
                    null
            }

            <View style={{ marginTop: 10 }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                    <Button
                        mode='text'
                        dark={true}
                        labelStyle={{ fontWeight: 'bold', justifyContent: 'center', alignItems: 'center' }}
                        color='#777777'
                        onPress={() => setmodalAdd(true)}
                        icon="plus">
                        Tambah Produk
                    </Button>
                    <View style={{ flex: 1 / 2, marginLeft: 20 }}>
                        <Searchbar
                            style={{ elevation: 0, borderRadius: 10 }}
                            placeholder='Cari Produk'
                            value={textCari}
                            onChangeText={text => settextCari(text)}
                            inputStyle={{fontSize:16}}
                        />
                    </View>

                </View>
                <FlatList
                    data={bykategori()}
                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
                    numColumns={5}
                    horizontal={false}
                    ListEmptyComponent={() => <View style={{flex:1, alignItems:'center', padding:20}}><Text style={{fontWeight:'bold', fontSize:15, color:'#AAAAAA'}}>Belum Ada Produk Dalam Kategori Ini</Text></View>}
                    renderItem={({ item }) => <ListProduct onPress={showDetailProduct} item={item} />}
                />


            </View>
        </View>
    )
}

export default ProductForm

const styles = StyleSheet.create({})
