import React, {useEffect, useState} from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import ListProduct from './ListProduct'
import firestore from '@react-native-firebase/firestore'
import { Searchbar } from 'react-native-paper'
import KategoriProduct from './KategoriProduct'

const DaftarProduct = () => {

    const [dataProduk, setdataProduk] = useState([])
    const [textSearch, settextSearch] = useState("")
    useEffect(() => {
        firestore().collection('produk').onSnapshot(onResult, onError)
    }, [])


    function onResult(QuerySnapshot) {

        let data = [];
        QuerySnapshot.docs.map((doc) => {
            data.push({ id: doc._ref._documentPath._parts[1], ...doc._data })

        })
        setdataProduk(data)
        // console.log(data)
    }

    function onError(error) {
        console.error(error);
    }

    const [selectedKategori, setselectedKategori] = useState("all")
    useEffect(() => {
        settextSearch('')
    }, [selectedKategori])
    const filterdata = (text) => {
        if(selectedKategori !== 'all')
        {
            return dataProduk.filter(item =>
                item.namaProduk.toLowerCase().includes(text.toLowerCase()) &&
                item.kategori === selectedKategori
            )
        }else
        {
            return dataProduk.filter(item =>
                item.namaProduk.toLowerCase().includes(text.toLowerCase())
            )
        }
        
    }
    const showKategori = (kategori) => {
        setselectedKategori(kategori.id)
    }
    return (
        <View style={{flex:1}}>
            
            <KategoriProduct selected={selectedKategori} setKategori={showKategori} />
            <View style={{flexDirection:'row', alignItems:'center', paddingRight:10, justifyContent:'space-between'}}>

            <Text style={{ marginLeft:10, fontSize: 17, fontWeight: 'bold' }}>Daftar Product</Text>
            <Searchbar value={textSearch} onChangeText={text => settextSearch(text)} style={{elevation:0, minWidth:300}} placeholder='Cari Produk' />
            </View>
            
            <View style={{ flex:1 }}>
                <ScrollView horizontal={false} style={{ paddingBottom: 20 }}>

                    <View style={{ flexDirection: "row", flexWrap: "wrap", paddingBottom: 10 }}>

                        {
                            filterdata(textSearch).map((item, index) => {
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
