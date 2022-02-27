import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DeviceInfo  from 'react-native-device-info'
import HomeMobile from './mobile/Home'
import HomeTablet from './tablet/Home'

const Home = () => {
    let isTablet = DeviceInfo.isTablet()
    return (
        
            isTablet ? <HomeTablet /> : <HomeMobile />
               
    )
}

export default Home

const styles = StyleSheet.create({})
