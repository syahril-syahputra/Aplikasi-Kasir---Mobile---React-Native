import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Product from '../../component/product/Product';
import Keranjang from '../../component/keranjang/Keranjang';
import DrawerContent from '../../component/DrawerNavigator/DrawerContent';
import DataProductMobile from './DataProduct';


const Drawer = createDrawerNavigator();
const HomeMobile = () => {
    return (

        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} initialRouteName="kasir"
        
            screenOptions={{
                // drawerType: Dimensions.get('screen').width >= 768 ? 'permanent' : 'hide',
                // drawerHideStatusBarOnOpen: true,
                // headerTitle: "aaa",
                headerShown:false,
                

            }}>
            <Drawer.Screen name="kasir" component={Product}/>
            <Drawer.Screen name="keranjang" component={Keranjang} />
            <Drawer.Screen name="daftarProduct" component={DataProductMobile} />
        </Drawer.Navigator>
        // <Text>arhiel</Text>
    )
}

export default HomeMobile

const styles = StyleSheet.create({})
