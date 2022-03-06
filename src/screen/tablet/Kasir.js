import React, { useState, createContext, useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-native-paper'
import { create } from 'react-test-renderer'
import Keranjang from './Kasir/Keranjang/Keranjang'
import InputVoucher from './Kasir/Modal/InputVoucher'
import PilihCustomer from './Kasir/Modal/PilihCustomer'
import SelectPrinter from './Kasir/Modal/SelectPrinter'
import DaftarProduct from './Kasir/Product/DaftarProduct'

export const keranjangContext = createContext()
export const voucherContext = createContext()
export const printerContext = createContext()
const keranjangReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            // console.log(action.data)
            return [...state, action.data]
        case 'delete':
            const newstate = state.filter(item => item.id !== action.data)
            // console.log(action.data)
            return newstate
        case 'tambahBarang':
            state[action.index].jumlah = state[action.index].jumlah + 1;
            return [...state]

        case 'kurangBarang':
            state[action.index].jumlah = state[action.index].jumlah - 1;
            return [...state]
        case 'clear':
            return [];
        default:
            return state;
    }
}
const printerReducer = (state, action) => {
    switch (action.type) {
        case 'set':
            // console.log(action.data)
            return action.data
        case 'clear':
            return {
                status: false,
                address: "",
                name: "",
            }
        default:
            return state;
    }
}
const voucherReducer = (state, action) => {
    switch (action.type) {
        case 'set':
            // console.log(action.data)
            return action.data

        case 'clear':
            return {
                nomorVoucher: "",
                tindakan: "",
                biaya: ""
            };
        default:
            return state;
    }
}
const KasirTablet = () => {


    const [item, dispatchItem] = useReducer(keranjangReducer, []);
    const [voucer, dispatchVoucher] = useReducer(voucherReducer, {
        nomorVoucher: "",
        tindakan: "",
        biaya: 0
    });
    const [printer, dispatchPrinter] = useReducer(printerReducer, {
        status: false,
        address: "",
        name: "",
    });

    const [modalPilihPelanggan, setmodalPilihPelanggan] = useState(false)
    const [modalInputVoucher, setmodalInputVoucher] = useState(false)
    return (
        <Provider>
            <keranjangContext.Provider value={[item, dispatchItem]}>
                <voucherContext.Provider value={[voucer, dispatchVoucher]}>
                    <printerContext.Provider value={[printer, dispatchPrinter]}>
                         <PilihCustomer visible={[modalPilihPelanggan, setmodalPilihPelanggan]} />
                        <InputVoucher modalPilihPelanggan={[modalPilihPelanggan, setmodalPilihPelanggan]} visible={[modalInputVoucher, setmodalInputVoucher]} />
                        <View style={{ flex: 1, backgroundColor: '#FF6600', flexDirection: 'row' }}>

                            <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
                                <DaftarProduct />
                            </View>
                            <View style={{ width: 300, backgroundColor: '#DDDDDD' }}>
                                <Keranjang modalInputVoucher={[modalInputVoucher, setmodalInputVoucher]} />
                            </View>
                        </View>
                    </printerContext.Provider>
                </voucherContext.Provider>
            </keranjangContext.Provider>
        </Provider>

    )
}

export default KasirTablet

const styles = StyleSheet.create({})
