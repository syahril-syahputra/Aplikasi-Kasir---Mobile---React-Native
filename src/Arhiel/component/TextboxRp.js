import React from 'react'
import { TextInput } from 'react-native-paper'
import { RpInput, rupiahBack } from '../../function/Rupiah'

const TextBoxRp = props => {

    const onCHangeText = (value) => {
        props.onChangeText(rupiahBack(value))
    }
    return (
        <TextInput
            mode="flat"
            label={props.title}
            keyboardType='numeric'
            outlineColor='#FF6600'
            selectionColor='#FFFF00'
            activeOutlineColor='#DDDDDD'
            activeUnderlineColor='#FF6600'
            selectionColor="#777777"
            style={{ backgroundColor: '#FFFFFF' }}
            placeholder={props.title}
            value={RpInput(props.value + "")}
            onChangeText={onCHangeText}
        />
    )
}

export default TextBoxRp

