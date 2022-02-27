import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider, Searchbar, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AddUser from './DataUser/Modal/AddUser'
import firestore from '@react-native-firebase/firestore'
import ListUser from './DataUser/ListUser'
import DetailUser from './DataUser/Modal/DetailUser'

const DataUser = () => {

    const [modalAddUser, setmodalAddUser] = useState(false)
    const [modalDetailUser, setmodalDetailUser] = useState(false)
    const [modalEditUser, setmodalEditUser] = useState(false)

    const [selectedUser, setselectedUser] = useState(null)

    const [searchText, setsearchText] = useState("")

    const [dataUser, setdataUser] = useState([])

    useEffect(() => {
        firestore().collection('User').onSnapshot(onResult, onError);
    }, [])

    function onResult(QuerySnapshot) {

        let data = [];
        QuerySnapshot.docs.map((doc) => {
            data.push({ id: doc._ref._documentPath._parts[1], ...doc._data })

        })
        setdataUser(data)
        console.log(data)
    }

    function onError(error) {
        console.error(error);
    }
    const showDetailUser = (User) => {
        setselectedUser(User)
        setmodalDetailUser(true)
    }
    const filterUser = () => {
        return dataUser.filter(item => 
            item.namaUser.toLowerCase().includes(searchText.toLowerCase()) ||
            item.emailUser.toLowerCase().includes(searchText.toLowerCase())
        )
    }
    return (
        <Provider>
            <AddUser visible={[modalAddUser, setmodalAddUser]} />            
            <DetailUser modalEdit={[modalEditUser, setmodalEditUser]} user={selectedUser} visible={[modalDetailUser, setmodalDetailUser]} />
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Button onPress={() => { setmodalAddUser(true) }} icon="plus" color='#777777' mode="contained" style={{ margin: 10 }}>
                        Tambah User
                    </Button>
                    <Searchbar value={searchText} onChangeText={text => setsearchText(text)} clearIcon={() => <Icon name='cancel' size={25} color={'#000000'} />} style={{ elevation: 0, borderBottomColor: '#DDDDDD', flex: 1, borderBottomWidth: 2 }} inputStyle={{ padding: 0, color: '#777777' }} placeholder='Masukan Nama User' />
                </View>

            </View>
            <View style={{ flex:1, flexDirection: "row", flexWrap: "wrap", paddingBottom: 10 }}>
                {
                    filterUser().map((item, index) => {
                        return <ListUser onPress={showDetailUser} key={index} item={item} />
                    })
                }
            </View>
        </Provider>
    )
}

export default DataUser

const styles = StyleSheet.create({})
