import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ListKategoriProduct from './ListKategoriProduct'
import firestore from '@react-native-firebase/firestore'
import { Avatar } from 'react-native-paper'

const KategoriProduct = props => {

    const [dataKategori, setdataKategori] = useState([])
    useEffect(() => {
        firestore().collection('kategoriProduk').onSnapshot(onResult, onError)
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

    return (
        <View style={{ padding: 10 }}>
            <View>

                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Kategori Product</Text>
            </View>

            <ScrollView horizontal={true}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => props.setKategori({id: "all"})} style={{ backgroundColor: props.selected === 'all' ? '#FFFFFF' : '#DDDDDD', minWidth: 100, padding: 15, alignItems: 'center', marginRight: 10, marginVertical: 10, borderRadius: 20 }}>
                        
                        <Avatar.Text size={50} label={"A"} color='#FFFFFF' backgroundColor='#999999' />
                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Semua Kategori</Text>
                    </TouchableOpacity>
                    {
                        dataKategori.map((item, index) => {

                           return item.id === props.selected ?
                           <ListKategoriProduct selected={true} onPress={props.setKategori} key={index} icon="allergies" item={item} />
                           :
                           <ListKategoriProduct onPress={props.setKategori} key={index} icon="allergies" item={item} />
                          
                           
                        })
                    }
                    
                </View>
            </ScrollView>
        </View>
    )
}

export default KategoriProduct

const styles = StyleSheet.create({})
