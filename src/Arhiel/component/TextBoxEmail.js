import React from 'react'
import { TextInput } from 'react-native-paper'

const TextBoxEmail = props => {

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
            autoCapitalize='none'
            autoCorrect={false}
            autoCompleteType='email'
            value={props.value}
            keyboardType='email-address'
            onChangeText={props.onChangeText}
        />
    )
}

export default TextBoxEmail

