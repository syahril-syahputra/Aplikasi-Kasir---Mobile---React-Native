import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Logout = props => {
   
    
    return (
        <View style={{alignItems:'center', shadowColor:'#666666', shadowOpacity:3, paddingHorizontal:20, paddingVertical:8, borderRadius:25, backgroundColor:'#FFFFFF', margin:10}}>
          <Icon  name="power-off" size={20} style={{marginBottom:5, marginTop:10}} color='#666666' />
          <Text style={{fontSize:12, color:'#666666', fontWeight:'bold'}}>Logout</Text>
        </View>
    )
}

export default Logout

const styles = StyleSheet.create({})
