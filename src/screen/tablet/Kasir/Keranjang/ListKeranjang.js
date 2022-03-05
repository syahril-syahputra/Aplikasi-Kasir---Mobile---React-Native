import React, { useState, useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Rp } from '../../../../function/Rupiah'
import { keranjangContext } from '../../Kasir';

const ListKeranjang = props => {
    const item = props.item;
    const [jumlah, setjumlah] = useState(item.jumlah)
    const [data, dispatch] = useContext(keranjangContext)
    const objekindex = data.findIndex((obj) => obj.id === item.id)
    const hapus = () => {
        dispatch({ type: 'delete', data: item.id })
    }
    const tambah = () => {
        dispatch({ type: 'tambahBarang', index: objekindex })
    }
    const kurang = () => {
        if (item.jumlah === 1) {
            dispatch({ type: 'delete', data: item.id })
        } else {
            dispatch({ type: 'kurangBarang', index: objekindex })
        }
    }
    return (
        <View style={{ backgroundColor: '#EEEEEE', marginBottom: 5, padding: 10, borderRadius: 10 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item.gambarProduk.url === "" ?
                <View>
                    <Icon name="image" size={50} color={"#AAAAAA"} style={{ backgroundColor: '#EEEEEE', marginRight: 10, borderRadius: 10 }} />
                </View>
                :
                <Image source={{ uri: item.gambarProduk.url }} style={{ width: 50, height: 50, resizeMode: 'contain', marginRight: 5, borderRadius: 20 }} />
            }
                
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12 }}>{item.namaProduk}  </Text>
                    <Text style={{ color: '#FF6600', fontSize: 12, marginTop: 5 }}>{Rp(item.hargaProduk, true)}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#777777' }}>{Rp(item.hargaProduk * item.jumlah, true)}</Text>
                </View>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <TouchableOpacity onPress={hapus} style={{ marginRight: 20 }}>
                    <Icon name='trash-alt' color="#BBBBBB" size={20} />
                    {/* <Text style={{  color:'#FFFFFF', fontWeight:'bold', fontSize:12 }} onPress={() => { }}>Hapus</Text> */}
                </TouchableOpacity>

                <TouchableOpacity onPress={kurang} style={[styles.buttonUpDown, { borderTopStartRadius: 10, borderBottomStartRadius: 10 }]}>
                    <Icon name="chevron-left" color="#ffffff" size={20} />
                </TouchableOpacity>
                <Text style={{ flex: 1, backgroundColor: '#fff7f2', textAlign: 'center', fontSize: 16, fontWeight: 'bold', paddingHorizontal: 5, paddingVertical: 5, color: '#777777' }}>
                    {item.jumlah}
                </Text>
                <TouchableOpacity onPress={tambah} style={[styles.buttonUpDown, { borderTopEndRadius: 10, borderBottomEndRadius: 10 }]}>
                    <Icon name="chevron-right" color="#FFFFFF" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ListKeranjang

const styles = StyleSheet.create({
    buttonUpDown: {
        paddingHorizontal: 10,
        backgroundColor: '#ffaf7a',
        paddingVertical: 5,
        color: '#FFFFFF',
        justifyContent: 'center',
    }
})
