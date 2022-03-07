import React, { useState, useEffect, useContext } from 'react'
import { Image, StyleSheet, Text, View, PermissionsAndroid } from 'react-native'

import auth from '@react-native-firebase/auth';
import { ActivityIndicator, Button, Title } from 'react-native-paper';
import { dataContext } from '../../App';
import firestore from '@react-native-firebase/firestore'
import TextBoxEmail from '../Arhiel/component/TextBoxEmail';
import TextBoxPassword from '../Arhiel/component/TextBoxPassword';
const Login = () => {

    const [isLoading, setisLoading] = useState(false)

    const [data, dispatch] = useContext(dataContext)

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ])

            if (granted['android.permission.CAMERA'] &&
                granted['android.permission.READ_EXTERNAL_STORAGE'] &&
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] &&
                granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
                // navigasi.dispatch(StackActions.replace('home'))
            } else {
                alert("Harap Izinkan Seluruh Fitur untuk menggunakan Aplikasi Ini.")
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        requestCameraPermission()
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // if (initializing) return null;
    // const [email, setemail] = useState("syahril.dev@gmail.com")
    // const [password, setpassword] = useState("1234567890")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const login = async () => {
        setisLoading(true)
        try {
            let response = await auth().signInWithEmailAndPassword(email, password)
            if (response && response.user) {
                if (email === "master@gmail.com") {
                    dispatch({ type: 'login', data: { id: "0000", email: email, nama: "Master Admin", fotoUser: "kosong" } })
                } else {

                    const user = await firestore().collection('User')
                        .where('emailUser', '==', email)
                        .where('passwordUser', '==', password)
                        .get()

                    setisLoading(false)
                    const resultuser = user._docs[0]
                    dispatch({ type: 'login', data: { id: response.user.uid, email: email, nama: resultuser._data.namaUser, fotoUser: resultuser._data.fotoUser.url } })


                }
            }
        } catch (e) {
            console.log(e)
            alert("Username Atau Password Yang Anda Masukan Salah!")
            setisLoading(false)
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', flexDirection:'row', justifyContent:'center', backgroundColor: '#EEEEEE', elevation: 5 }}>


            <Image source={require("../image/logoaplikasi.png")} style={{ width: 300, maxHeight: 300, marginRight:20 }} />
                <View style={{ width: 300, padding: 10, borderRadius: 10 }}>
                    <Title style={{ color: '#777777', fontSize: 19, marginBottom: 10 }}>Silahkan Login</Title>
                    <View>
                        <TextBoxEmail title="Email User" value={email} onChangeText={(text) => setemail(text)} />

                    </View>
                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <TextBoxPassword title="Password" value={password} onChangeText={(text) => setpassword(text)} />
                    </View>
                    {
                        isLoading ?
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'center' }}>
                                <ActivityIndicator size={20} color='#FF6600' />
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FF6600', marginLeft: 10 }}>Mohon Tunggu</Text>
                            </View>
                            :


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>Lupa Password ? </Text>
                                <Button onPress={login} icon="key" mode='contained' color='#FF6600' dark={true}>Login</Button>
                            </View>
                    }
                </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#777777',
        marginBottom: 5,
    },
    textbox: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        borderRadius: 5,
    }
})
