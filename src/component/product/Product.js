import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DaftarProduct from './DaftarProduct'
import KategoriProduct from './KategoriProduct'

const Product = () => {
    return (
        <View style={{flex:1}}>
            <KategoriProduct />
            <DaftarProduct />
        </View>
    )
}

export default Product

const styles = StyleSheet.create({})
