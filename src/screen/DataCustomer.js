import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DataCustomer = () => {
    const renderRow = () => {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>aaa</Text></View> 
                <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>aaa</Text></View>
                <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>aaa</Text></View>
                <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>aaa</Text></View>
                <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>aaa</Text></View>
            </View>
        );
    }
    const data = [1, 2, 3, 4, 5];

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
                data.map((datas, index) => {
                    return renderRow()
                })
                
            }
        </View>
    );
}

export default DataCustomer

const styles = StyleSheet.create({})
