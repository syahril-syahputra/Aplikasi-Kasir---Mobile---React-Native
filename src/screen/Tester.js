import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Product from '../component/product/Product'
import Keranjang from '../component/keranjang/Keranjang'
import Icon from 'react-native-vector-icons/FontAwesome5';
import DrawerContent from '../component/DrawerNavigator/DrawerContent'


const Drawer = createDrawerNavigator();
const Tester = () => {
    return (

        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} initialRouteName="Home"
        
            screenOptions={{
                // drawerType: Dimensions.get('screen').width >= 768 ? 'permanent' : 'hide',
                // drawerHideStatusBarOnOpen: true,
                // headerTitle: "aaa",
                headerShown:false,
                

            }}>
            <Drawer.Screen name="Home" component={Product}/>
            <Drawer.Screen name="Notifications" component={Keranjang} />
        </Drawer.Navigator>
        // <Text>arhiel</Text>
    )
}

export default Tester

const styles = StyleSheet.create({})
