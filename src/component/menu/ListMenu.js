import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ListMenu = props => {
    const title = props.title;
    const icon = props.icon;
    const selected = props.selected;
    return (
        <TouchableOpacity onPress={() => props.onPress(props.value)} style={{alignItems:'center', shadowColor:'#666666', shadowOpacity:3, paddingHorizontal:20, paddingVertical:8, borderRadius:15, backgroundColor:selected ? '#FF6600' : '#FFFFFF', margin:10}}>
          <Icon  name={icon} size={20} style={{marginBottom:5, marginTop:10}} color={selected ? '#FFFFFF' : '#777777'} />
          <Text style={{fontSize:12, color:selected ? '#FFFFFF' : '#777777', fontWeight:'bold'}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ListMenu

const styles = StyleSheet.create({})
