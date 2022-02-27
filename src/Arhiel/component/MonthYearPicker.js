import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';
const MonthYearPicker = props => {
    const startYearFrom = props.startYear;
    

    const [selectedbulan, setselectedbulan] = useState(props.bulan)
    const [selectedtahun, setselectedtahun] = useState(props.tahun)

    const namaBulan = ["Januari", "Fabruari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    

    const tahun = () => {
        const childTahun = []
        for(let i = new Date().getFullYear(); i >= startYearFrom; i--){
           
            childTahun.push(
                <Picker.Item key={i} label={i + ""} value={i} />
            )
        }
        return childTahun;
    }
    const change = (data, value) => {
        if(data === "bulan")
        {
            setselectedbulan(value)
            props.onChange(value, selectedtahun)
        }else
        {
            setselectedtahun(value)
            props.onChange(selectedbulan, value)
        }
       
    }   
    return (
        <View style={{flexDirection:'row'}}>
            <Picker
                style={styles.picker}
                selectedValue={selectedbulan}
                onValueChange={(itemValue, itemIndex) =>{
                    change("bulan", itemValue)
                    // console.log(itemValue)
                }
                }>
                {
                    namaBulan.map((item, index) => {
                        return <Picker.Item key={index} label={item} value={index} />
                    })
                }

            </Picker>
            <Picker
                style={styles.picker}
                selectedValue={selectedtahun}
                onValueChange={(itemValue, itemIndex) =>
                    change("tahun", itemValue)
                }>
                {
                    tahun()
                }

            </Picker>
        </View>
    )
}

export default MonthYearPicker

const styles = StyleSheet.create({
    picker : {
        backgroundColor:'#FFFFFF',
        width:200,
        
    }
})
