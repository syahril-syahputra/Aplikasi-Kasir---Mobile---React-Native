import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider, Searchbar, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AddCustomer from './DataCustomer/Modal/AddCustomer'
import firestore from '@react-native-firebase/firestore'
import ListCustomer from './DataCustomer/ListCustomer'
import DetailCustomer from './DataCustomer/Modal/DetailCustomer'
import DetailVoucher from './voucher/modal/DetailVoucher'

const Voucher = () => {

    
    const [modalDetailCustomer, setmodalDetailCustomer] = useState(false)
    const [modalEditCustomer, setmodalEditCustomer] = useState(false)

    const [selectedCustomer, setselectedCustomer] = useState(null)

    const [searchText, setsearchText] = useState("")

    const [dataCustomer, setdataCustomer] = useState([])

    useEffect(() => {
        firestore().collection('customer').onSnapshot(onResult, onError);
    }, [])

    function onResult(QuerySnapshot) {

        let data = [];
        QuerySnapshot.docs.map((doc) => {
            data.push({ id: doc._ref._documentPath._parts[1], ...doc._data })

        })
        setdataCustomer(data)
        console.log(data)
    }

    function onError(error) {
        console.error(error);
    }
    const showDetailCustomer = (customer) => {
        setselectedCustomer(customer)
        setmodalDetailCustomer(true)
    }
    const filterCustomer = () => {
        return dataCustomer.filter(item => 
            item.namaCustomer.toLowerCase().includes(searchText.toLowerCase()) ||
            item.hpCustomer.toLowerCase().includes(searchText.toLowerCase())
        )
    }
    return (
        <Provider>
            <DetailVoucher modalEdit={[modalEditCustomer, setmodalEditCustomer]} customer={selectedCustomer} visible={[modalDetailCustomer, setmodalDetailCustomer]} />
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                   
                    <Searchbar value={searchText} onChangeText={text => setsearchText(text)} clearIcon={() => <Icon name='cancel' size={25} color={'#000000'} />} style={{ elevation: 0, borderBottomColor: '#DDDDDD', flex: 1, borderBottomWidth: 2 }} inputStyle={{ padding: 0, color: '#777777' }} placeholder='Masukan Nama Atau Nomor HP Customer' />
                </View>

            </View>
            <View style={{ flex:1, flexDirection: "row", flexWrap: "wrap", paddingBottom: 10 }}>
                {
                    filterCustomer().map((item, index) => {
                        return <ListCustomer onPress={showDetailCustomer} key={index} item={item} />
                    })
                }
            </View>
        </Provider>
    )
}

export default Voucher

const styles = StyleSheet.create({})
