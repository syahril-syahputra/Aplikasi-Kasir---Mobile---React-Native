import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Label = props => {
    return (

        <Text style={styles.label}>{props.children}</Text>
    )
}

export default Label

const styles = StyleSheet.create({
    label:{
        fontWeight:'bold',
        fontSize:16,
        marginTop:10,
        marginBottom:5
    }
})
