import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '../../component/DrawerNavigator/DrawerContent';
import KasirTablet from './Kasir';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DataProductTablet from './DataProduct';
import DataCustomerTable from './DataCustomer';
import LaporanTablet from './Laporan';
import LaporanBulanan from './LaporanBulanan';
import DataUser from './DataUser';


const Drawer = createDrawerNavigator();
const HomeTablet = () => {
    return (

        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} initialRouteName="kasir"

            screenOptions={{
                // drawerType: Dimensions.get('screen').width >= 768 ? 'permanent' : 'hide',
                // drawerHideStatusBarOnOpen: true,
                headerTitle: (props => <Text>arhiel</Text>),
                // headerShown:false,\


            }}>
            <Drawer.Screen name="kasir" component={KasirTablet} />
            <Drawer.Screen name="daftarProduct" component={DataProductTablet} />
            <Drawer.Screen name="daftarCustomer" component={DataCustomerTable} />
            <Drawer.Screen name="laporan" component={LaporanBulanan} />
            <Drawer.Screen name="laporanharian" component={LaporanTablet} />
            <Drawer.Screen name="dataUser" component={DataUser} />
        </Drawer.Navigator>
        // <Text>arhiel</Text>
    )
}

export default HomeTablet

const styles = StyleSheet.create({})
