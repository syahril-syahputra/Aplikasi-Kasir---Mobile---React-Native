import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

const ListKategoriProduct = props => {
    const title = props.title
    return (
        <View style={{backgroundColor:'#FFFFFF', minWidth:50, padding:15, alignItems:'center', marginRight:10, marginVertical:10, borderRadius:20}}>
            <Icon size={25} style={{marginBottom:15, marginTop:5}} name={props.icon} color="#777777" />
            <Text style={{fontSize:12, fontWeight:'bold'}}>{title}</Text>
        </View>
    )
}

export default ListKategoriProduct

const styles = StyleSheet.create({})
