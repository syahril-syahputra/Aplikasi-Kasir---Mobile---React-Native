import React, { useState } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { Portal, Modal, Title, Button, ActivityIndicator } from 'react-native-paper'
import { Rp } from '../../../../function/Rupiah'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const DetailCustomer = props => {
    const [visible, setVisible] = props.visible
    const [modalEdit, setmodalEdit] = props.modalEdit
    const item = props.customer
    const [onLoading, setonLoading] = useState(false)

    const deleteCustomer = async () => {
       
        setonLoading(true)
        if(item.fotoCustomer.file !== "")
        {
            var data = storage().ref(item.fotoCustomer.file);
            await data.delete()
        }
       
        await firestore()
            .collection('customer')
            .doc(item.id)
            .delete()
        setonLoading(false)
        setVisible(false)
    }

    return (
        <Portal style={styles.portal}>
            <Modal visible={visible} dismissable={false} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 50, alignSelf: 'center', padding: 20 }}>

                {
                    item ?
                        <View style={{ flexDirection: 'row', width: 600, alignItems: 'center', alignItems:'flex-start' }}>
                            {
                                item.fotoCustomer.url === "" ?
                                    <View>
                                        <Icon name="account" size={200} color={"#FFFFFF"} style={{backgroundColor:'#AAAAAA', marginRight: 10, borderRadius: 10}}/>
                                    </View>
                                    :
                                    <Image source={{ uri: item.fotoCustomer.url }} style={{ backgroundColor: '#EEEEEE', marginRight: 10, borderRadius: 10, resizeMode: 'contain' }} width={200} height={200} />

                            }

                            <View>
                                <View>
                                    <Title style={styles.title}>Kode Customer</Title>
                                    <Text>{item.kodeCustomer}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Nama Customer</Title>
                                    <Text>{item.namaCustomer}</Text>
                                </View>
                                
                                <View>
                                    <Title style={styles.title}>Umur Customer</Title>
                                    <Text>{item.umurCustomer}</Text>
                                </View>
                                
                                <View>
                                    <Title style={styles.title}>Jenis Kelamin Customer</Title>
                                    <Text>{item.jenisKelamin}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Pekerjaan Customer</Title>
                                    <Text>{item.pekerjaanCustomer}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Alamat Customer</Title>
                                    <Text>{item.alamatCustomer}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>No. HP Customer</Title>
                                    <Text>{item.hpCustomer}</Text>
                                </View>
                            </View>
                        </View>
                        : null
                }



                {
                    onLoading ?
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <ActivityIndicator animating={true} color={"#FF6600"} style={{ marginRight: 5 }} />
                            <Text style={{ color: '#FF6600' }}>Loading</Text>
                        </View> :


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Button icon="close-thick" color="#AAAAAA" mode="text" onPress={() => setVisible(false)}>
                                Tutup
                            </Button>
                            <View style={{ flexDirection: 'row' }}>
                                <Button icon="pencil" color="#5f6bff" mode="text" onPress={() => { setVisible(false); setmodalEdit(true) }}>
                                    Edit
                                </Button>
                                <Button icon="delete" color="#ff4242" mode="text" onPress={deleteCustomer}>
                                    Hapus
                                </Button>
                            </View>
                        </View>
                }
            </Modal>
        </Portal>
    )
}

export default DetailCustomer

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: '#777777'
    }
})
