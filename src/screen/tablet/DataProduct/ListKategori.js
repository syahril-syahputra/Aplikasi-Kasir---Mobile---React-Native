import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'

const ListKategori = props => {
    const item = props.item
    const selected = props.selected
    return (
        <TouchableOpacity onPress={props.onPress} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginHorizontal: 10, marginVertical: 5, backgroundColor: '#FFFFFF', borderBottomColor: '#DDDDDD', borderBottomWidth: 1 }}>
            <View><Text style={{ fontWeight: 'bold', color: '#777777' }}>{item.namaKategori}</Text>
                <Text style={{ fontSize: 11 }}>{item.deskripsiKategori}</Text>
            </View>
            {
                selected ?
                    selected.id === item.id ?

                        <Icon name="caret-right" size={25} />
                        : null
                    : null
            }
        </TouchableOpacity>
    )
}

export default ListKategori

const styles = StyleSheet.create({})
