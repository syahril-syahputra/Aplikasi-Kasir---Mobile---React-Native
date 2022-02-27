import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import DatePicker from 'react-native-date-picker'
import { ArhielTgl, ArhielTglLessTime } from '../../function/ArhielTgl'
const DateTimePicker = props => {
    
    // const [date, setDate] = useState(new Date())
    const date = props.value
    const [open, setOpen] = useState(false)
    return (
        <>
            <View style={{ flexDirection: 'row' }}>

                <Text  onPress={() => setOpen(true)}  style={{backgroundColor:'#FFFFFF', textAlignVertical:'center', padding:10}}>{ArhielTglLessTime(date.toString())}</Text>
                {/* <Button onPress={() => setOpen(true)} title='Pilih' /> */}
            </View>

            <DatePicker
                modal
                open={open}
                date={date}
                mode='date'
                title='Pilih Hari'

                onConfirm={(res) => {
                    setOpen(false)
                    props.onChange(res)
                    // setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    )
}

export default DateTimePicker

const styles = StyleSheet.create({})
