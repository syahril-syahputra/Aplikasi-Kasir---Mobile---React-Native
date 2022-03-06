import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, DeviceEventEmitter } from 'react-native'
import { Portal, Modal, Searchbar, Button, ActivityIndicator, Title, Snackbar } from 'react-native-paper'

import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from '@brooons/react-native-bluetooth-escpos-printer';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';





const SelectPrinter = props => {
    const [visible, setVisible] = props.visible

    
    const [rsp, setrsp] = useState([])
    const scanning = () => {
        BluetoothManager.scanDevices()
            .then((s) => {
                var ss = JSON.parse(s);//JSON string
                // setrsp(ss.pared)
                console.log(ss)
                setrsp(ss.paired)
            }, (er) => {
                this.setState({
                    loading: false
                })
                alert('error' + JSON.stringify(er));
            });
    }
    const selectDevice = (device) => {
        BluetoothManager.connect(device)
        .then((s)=>{
            setVisible(false)
           //success here
        },
        (err)=>{
            alert("Gagal Koneksi Ke Printer")
           //error here
        })
    }

    return (
        <Portal style={styles.portal}>
            <Modal dismissable={false} visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: '#EEEEEE', marginHorizontal: 50, alignSelf: 'center', padding: 10 }}>

                <View style={{ width: 600 }}>
                    <View>
                        <Button onPress={scanning} color="#FF6600">Refresh</Button>
                    </View>
                    <FlatList
                        data={rsp}
                        style={{width:'100%', marginVertical:10, height:300, backgroundColor:'#FFFFFF', borderRadius:10}}
                       
                        renderItem={({ item }) => <TouchableOpacity onPress={()=>selectDevice(item.address)} style={{padding:10, backgroundColor:'#DDDDDD', flexDirection:'row', alignItems:"center", borderRadius:10, margin:5}}>
                                                <Icon size={20} style={{marginRight:5}} name="bluetooth" color="#777777" />
                                                <Text>{item.name}</Text>
                                            </TouchableOpacity>}
                    />
                    <Button onPress={()=>setVisible(false)} color="#777777">Cancel</Button>
                </View>
            </Modal>
        </Portal>
    )
}

export default SelectPrinter

const styles = StyleSheet.create({})
