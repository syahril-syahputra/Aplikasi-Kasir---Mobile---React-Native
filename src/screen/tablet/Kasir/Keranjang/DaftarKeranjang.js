import React, { useContext, useState } from 'react'
import { DeviceEventEmitter } from 'react-native';
import { StyleSheet, FlatList, View, Text } from 'react-native'
import ListKeranjang from './ListKeranjang'
import { keranjangContext } from '../../Kasir'

import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from '@brooons/react-native-bluetooth-escpos-printer';
import { Button, Provider } from 'react-native-paper';
import { printerContext } from '../../Kasir';
import SelectPrinter from '../Modal/SelectPrinter';

const DaftarKeranjang = () => {

    const [statusPrinter, setstatusPrinter] = useState("Disconnected")

    DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_CONNECTED, (rsp) => {
            setstatusPrinter("Connected")
            dispatchPrinter({
                type: 'set', data: {
                    status: true,
                    name: rsp.device_name,
                }
            })
            // console.log(rsp)
            // console.log(rsp) // rsp.devices would returns the paired devices array in JSON string.
        }
    );
    DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST, (rsp) => {
            dispatchPrinter({ type: 'clear' })
            // console.log(rsp) // rsp.devices would returns the paired devices array in JSON string.
        }
    );
    const [data, dispatch] = useContext(keranjangContext)
    const [printer, dispatchPrinter] = useContext(printerContext)
    
    
    const [modalSelectPrinter, setmodalSelectPrinter] = useState(false)
    return (
            
                       
            <View style={{ flex: 1, backgroundColor: '#DDDDDD' }}>
            <SelectPrinter  visible={[modalSelectPrinter, setmodalSelectPrinter]} />
                <View style={{ backgroundColor: '#EEEEEE', borderRadius: 10, marginBottom: 10, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: '#777777' }}>Printer : </Text>{
                            printer.status ?
                                <Text style={{ color: 'green' }}>{printer.name}</Text> :
                                <Text style={{ color: 'red' }}>Disconnected</Text>
                        }

                    </View>
                    <Button onPress={()=> setmodalSelectPrinter(true)} color="#FF6600">Find</Button>
                </View>
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
