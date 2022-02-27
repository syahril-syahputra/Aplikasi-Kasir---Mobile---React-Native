import React, { useState } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { Portal, Modal, Title, Button, ActivityIndicator } from 'react-native-paper'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const DetailUser = props => {
    const [visible, setVisible] = props.visible
    const item = props.user
    const [onLoading, setonLoading] = useState(false)

    const deleteUser = async () => {

        setonLoading(true)
        if (item.fotoUser.file !== "") {
            var data = storage().ref(item.fotoUser.file);
            await data.delete()
        }
        auth().signInWithEmailAndPassword(item.emailUser, item.passwordUser).then(async (user) => {
            await auth().currentUser.delete()
            await firestore()
                .collection('User')
                .doc(item.id)
                .delete()
            // auth().deleteUser(use)
            setonLoading(false)
            setVisible(false)
        })

    }

    return (
        <Portal style={styles.portal}>
            <Modal visible={visible} dismissable={false} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 50, alignSelf: 'center', padding: 20 }}>

                {
                    item ?
                        <View style={{ flexDirection: 'row', width: 600, alignItems: 'center' }}>
                            {
                                item.fotoUser.url === "" ?
                                    <View>
                                        <Icon name="account" size={200} color={"#FFFFFF"} style={{ backgroundColor: '#AAAAAA', marginRight: 10, borderRadius: 10 }} />
                                    </View>
                                    :
                                    <Image source={{ uri: item.fotoUser.url }} style={{ backgroundColor: '#EEEEEE', marginRight: 10, borderRadius: 10, resizeMode: 'contain' }} width={200} height={200} />

                            }

                            <View>
                                <View>
                                    <Title style={styles.title}>Nama User</Title>
                                    <Text>{item.namaUser}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Email User</Title>
                                    <Text>{item.emailUser}</Text>
                                </View>
                                <View>
                                    <Title style={styles.title}>Password</Title>
                                    <Text>{item.passwordUser}</Text>
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
                                <Button icon="delete" color="#ff4242" mode="text" onPress={deleteUser}>
                                    Hapus
                                </Button>
                            </View>
                        </View>
                }
            </Modal>
        </Portal>
    )
}

export default DetailUser

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: '#777777'
    }
})
