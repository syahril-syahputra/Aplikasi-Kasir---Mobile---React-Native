import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'
import { Button, DataTable, Modal, Portal, TextInput, Provider, Title } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import { ScrollView } from 'react-native-gesture-handler'

const InputStokAwal = props => {

    const [visible, setVisible] = props.visible

    const [dataStok, setDataStok] = useState({})
    const updateStok = (text, id) => {

        const newArray = {...dataStok};
        newArray[id] = parseInt(text == '' ? 0 : text)
        setDataStok(newArray);

        // const temp = dataStok;
        // temp[id] = isNaN(text) ? text : 0
        // setDataStok(temp)
    }
    useEffect(() => {
        if (visible) {
            setDataStok(props.stok)
            // console.log("s ")
        } else {

        }
    }, [visible])

    const createRows = () => {
        const tempdata = []
        props.produk.map((item, index) => {

            const oddeven = index % 2;
            // console.log(dataStok[item.id])
            tempdata.push(


                <DataTable.Row key={index} style={{ backgroundColor: oddeven === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                    <DataTable.Cell>{item._data.kodeProduk}</DataTable.Cell>
                    <DataTable.Cell style={{ alignItems: 'center', borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>{item._data.namaProduk}</DataTable.Cell>
                    <DataTable.Cell style={{ alignItems: 'center', borderLeftWidth: 1, paddingVertical: 5, borderColor: '#DDDDDD', justifyContent: 'center' }} numeric>
                        
                        <TextInput value={dataStok[item.id] ? dataStok[item.id] + "" : "0"} onChangeText={text => updateStok(text, item.id)} keyboardType='number-pad' style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#AAAAAA', borderRadius: 10, textAlign: 'center', width: 100 }} />
                    </DataTable.Cell>
                </DataTable.Row>
            )
        })
        // console.log(tempdata)
        return tempdata
    }
    const finish = () => {
        props.finish(dataStok)
    }

    return (
        <Portal style={styles.portal}>
            <Modal dismissable={false} visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 50, alignSelf: 'center', padding: 20 }}>
                <Text>Input Stok Awal Bulan </Text>
                <View style={{ width: Dimensions.get('window').width - 100, height: Dimensions.get('window').height - 300, }}>
                    <DataTable style={{ flex: 1 }}>
                        <DataTable.Header style={{ backgroundColor: '#f0f0f0', borderTopColor: '#DDDDDD', borderTopWidth: 1 }}>
                            <DataTable.Cell>Kode Produk</DataTable.Cell>
                            <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }}>Nama Produk</DataTable.Title>
                            <DataTable.Title style={{ borderLeftWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center' }}>Stok Awal</DataTable.Title>
                        </DataTable.Header>
                        <ScrollView style={{ flex: 1, backgroundColor: '#DDDDDD' }}>
                            {

                                createRows()
                            }

                        </ScrollView>
                    </DataTable>
                    <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between' }}>

                        <Button mode='text' color='#777777' dark={true} onPress={() => setVisible(false)}>Batal</Button>
                        <Button mode='contained' color='#FF6600' dark={true} onPress={finish}>Update Stok Awal</Button>
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

export default InputStokAwal

const styles = StyleSheet.create({
    portal: {
        justifyContent: 'center'
    }
})
