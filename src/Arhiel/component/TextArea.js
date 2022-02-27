import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'

const TextArea = props => {
    return (
        <TextInput
            mode="flat"
            label={props.title}
            numberOfLines={4}
            multiline={true}
            outlineColor='#FF6600'
            selectionColor='#FFFF00'
            activeOutlineColor='#DDDDDD'
            activeUnderlineColor='#FF6600'
            selectionColor="#777777"
            style={{ backgroundColor: '#FFFFFF' }}
            placeholder={props.title}
            value={props.value}
            onChangeText={props.onChangeText}
        />
    )
}

export default TextArea
