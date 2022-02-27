import React from 'react'
import { TextInput } from 'react-native-paper'

const TextBoxHP = props => {

    return (
        <TextInput
            mode="flat"
            label={props.title}
            outlineColor='#FF6600'
            selectionColor='#FFFF00'
            activeOutlineColor='#DDDDDD'
            activeUnderlineColor='#FF6600'
            selectionColor="#777777"
            style={{ backgroundColor: '#FFFFFF' }}
            placeholder={props.title}
            value={props.value}
            keyboardType='phone-pad'
            onChangeText={props.onChangeText}
        />
    )
}

export default TextBoxHP

