import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ListKategoriProduct from './ListKategoriProduct'

const KategoriProduct = () => {
    return (
        <View style={{ padding: 10 }}>
            <View>

                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Kategori Product</Text>
            </View>

            <ScrollView horizontal={true}>
                <View style={{ flexDirection: 'row' }}>
                    <ListKategoriProduct icon="allergies" title="Skin Care" />
                    <ListKategoriProduct icon='theater-masks' title="Makeup" />
                    <ListKategoriProduct icon="quidditch" title="Personal Care"/>
                    <ListKategoriProduct icon="acquisitions-incorporated" title="Fregrance" />
                    <ListKategoriProduct icon="user" title="Spa Product" />
                    <ListKategoriProduct icon="grin-squint-tears" title="Hair Product" />
                </View>
            </ScrollView>
        </View>
    )
}

export default KategoriProduct

const styles = StyleSheet.create({})
