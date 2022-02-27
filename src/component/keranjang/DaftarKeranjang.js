import React from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import ListKeranjang from './ListKeranjang'

const DaftarKeranjang = () => {
    const data = [
        {
            idProduct: 1,
            namaProduct: "Nama Product",
            gambarProduct: require("../../image/product2.jpg"),
            jumlah: 2,
            hargaProduct: 30000,
        },
        {
            idProduct: 1,
            namaProduct: "Nama Product",
            gambarProduct: require("../../image/product3.jpg"),
            jumlah: 2,
            hargaProduct: 30000,
        },
        {
            idProduct: 1,
            namaProduct: "Nama Product",
            gambarProduct: require("../../image/product4.jpg"),
            jumlah: 2,
            hargaProduct: 30000,
        }
    ]
    return (
        <View style={{ flex: 1, backgroundColor:'#DDDDDD' }}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <ListKeranjang item={item} />}
            />
        </View>
    )
}

export default DaftarKeranjang

const styles = StyleSheet.create({})
