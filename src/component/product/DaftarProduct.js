import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import ListProduct from './ListProduct'

const DaftarProduct = () => {

    const data = [
        {
            nama: "Product 2",
            gambar: require("../../image/product2.jpg"),
            harga: 30000
        },
        {
            nama: "Product 3",
            gambar: require("../../image/product3.jpg"),
            harga: 75000
        },
        {
            nama: "Product 4",
            gambar: require("../../image/product4.jpg"),
            harga: 45000
        },
        {
            nama: "Product 5",
            gambar: require("../../image/product5.jpg"),
            harga: 120000
        },
        {
            nama: "Product 6",
            gambar: require("../../image/product6.jpg"),
            harga: 300000
        },
        {
            nama: "Product 7",
            gambar: require("../../image/product7.jpg"),
            harga: 27000
        },
        {
            nama: "Product 7",
            gambar: require("../../image/product8.jpg"),
            harga: 1200000
        },
        {
            nama: "Product 10",
            gambar: require("../../image/product9.jpg"),
            harga: 350000
        },
        {
            nama: "Product 7",
            gambar: require("../../image/product10.jpg"),
            harga: 2400000
        },
        {
            nama: "Product 7",
            gambar: require("../../image/product11.jpg"),
            harga: 125000
        },
        {
            nama: "Product 10",
            gambar: require("../../image/product12.jpg"),
            harga: 320000
        },
        {
            nama: "Product 7",
            gambar: require("../../image/product13.jpg"),
            harga: 2400
        }
    ]

    return (
        <View style={{flex:1}}>
            <Text style={{ marginLeft:10, fontSize: 20, fontWeight: 'bold' }}>Daftar Product</Text>
            
            <View style={{ flex:1 }}>
                <ScrollView horizontal={false} style={{ paddingBottom: 20 }}>

                    <View style={{ flexDirection: "row", flexWrap: "wrap", paddingBottom: 10 }}>

                        {
                            data.map((item, index) => {
                                return <ListProduct key={index} item={item} />
                            })

                        }
                    </View>
                </ScrollView>
            </View>

        </View>
    )
}

export default DaftarProduct

const styles = StyleSheet.create({})
