import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Rp } from '../../../../function/Rupiah'
import { keranjangContext } from '../../Kasir'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ListProduct = props => {

    const [data, dispatchData] = useContext(keranjangContext)
    const item = props.item
    const addToChart = () => {
        const find = data.find(data => data.id === item.id)
        if (find) {
            // dispatchData({type:'clear'})
            alert(item.namaProduk + " Sudah Ada Di Keranjang")
            // dispatchData({ type: 'add', data:{...item, jumlah : find.jumlah + 1} })
        } else {

            dispatchData({ type: 'add', data: { ...item, jumlah: 1 } })
        }
    }
    return (
        <TouchableOpacity onPress={addToChart} style={{ backgroundColor: '#FFFFFF', alignItems: 'center', borderRadius: 20, padding: 10, margin: 10 }}>
            {item.gambarProduk.url === "" ?
                <View>
                    <Icon name="image" size={100} color={"#DDDDDD"} style={{ backgroundColor: '#FAFAFA', marginRight: 10, height: 80 , borderRadius: 10 }} />
                </View>
                :
                <Image style={{ width: 100, height: 80 }} source={{ uri: item.gambarProduk.url }} />
            }
            <Text style={{ fontWeight: 'bold', color: '#777777', marginBottom: 10, marginTop: 10 }}>{item.namaProduk}</Text>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#FF6600' }}>{Rp(item.hargaProduk, true)}</Text>
        </TouchableOpacity>
    )
}

export default ListProduct

const styles = StyleSheet.create({})
