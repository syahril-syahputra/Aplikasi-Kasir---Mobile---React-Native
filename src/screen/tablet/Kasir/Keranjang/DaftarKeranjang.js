import React, { useContext } from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import ListKeranjang from './ListKeranjang'
import { keranjangContext } from '../../Kasir'

const DaftarKeranjang = () => {

    const [data, dispatch] = useContext(keranjangContext)
    return (
        <View style={{ flex: 1, backgroundColor: '#DDDDDD' }}>
            <FlatList
                style={{ backgroundColor: '#F4F4F4', borderRadius: 10, padding: 10 }}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <ListKeranjang item={item} />}
            />
        </View>
    )
}

export default DaftarKeranjang

const styles = StyleSheet.create({})
