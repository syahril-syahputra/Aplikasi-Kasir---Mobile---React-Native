import React from 'react'
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'

const Tombol = props => {
    
    return (
        <TouchableOpacity onPress={props.onPress} style={{paddingHorizontal:20, paddingVertical:10, backgroundColor:'#FF6600', borderRadius:10, alignItems:'center'}}>
            <Text style={{color:'#FFFFFF', fontWeight:'bold', fontSize:16}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default Tombol

const styles = StyleSheet.create({})
