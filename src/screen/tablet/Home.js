import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '../../component/DrawerNavigator/DrawerContent';
import KasirTablet from './Kasir';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DataProductTablet from './DataProduct';
import DataCustomerTable from './DataCustomer';
import Stok from './Stok'
import LaporanTablet from './Laporan';
import LaporanBulanan from './LaporanBulanan';
import DataUser from './DataUser';
import Voucher from './Voucher';
import tester from './tester';


const Drawer = createDrawerNavigator();
const HomeTablet = () => {
    return (

        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} initialRouteName="tester"

            screenOptions={{
                // drawerType: Dimensions.get('screen').width >= 768 ? 'permanent' : 'hide',
                // drawerHideStatusBarOnOpen: true,
                headerTitle: (props => <Text>Aplikasi</Text>),
                // headerShown:false,\


            }}>
            <Drawer.Screen name="kasir" component={KasirTablet} />
            <Drawer.Screen name="daftarStok" component={Stok} />
            <Drawer.Screen name="daftarProduct" component={DataProductTablet} />
            <Drawer.Screen name="daftarCustomer" component={DataCustomerTable} />
            <Drawer.Screen name="laporan" component={LaporanBulanan} />
            <Drawer.Screen name="laporanharian" component={LaporanTablet} />
            <Drawer.Screen name="dataUser" component={DataUser} />
            <Drawer.Screen name="voucher" component={Voucher} />
            <Drawer.Screen name="tester" component={tester} />
        </Drawer.Navigator>
        // <Text>arhiel</Text>
    )
}

export default HomeTablet

const styles = StyleSheet.create({})
