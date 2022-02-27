import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import ListMenu from './ListMenu'
import Logout from './Logout'

const Menu = props => {
    const [selected, setselected] = props.selected

    const ClickHandler = (key) => {
        setselected(key)
        // alert(selec)
    }
    return (
        <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 10 }}>
            <Image source={require("../../image/logoaplikasi.png")} style={{ width: 110, height: 110 }} />

            <View style={{ flex: 1 }}>
                <ListMenu onPress={ClickHandler} value="home" title="Home" icon="hand-holding-usd" selected={selected === 'home' ? true : false} />
                {/* <ListMenu onPress={ClickHandler} value="laporan" title="Laporan" icon="chart-bar" selected={selected === 'laporan' ? true : false} /> */}
                <ListMenu onPress={ClickHandler} value="produk" title="Product" icon="box-open" selected={selected === 'produk' ? true : false} />
                <ListMenu onPress={ClickHandler} value="customer" title="Customer" icon="user-cog" selected={selected === 'customer' ? true : false} />
                {/* <ListMenu onPress={ClickHandler} value="setting" title="Setting" icon="cogs" selected={selected === 'setting' ? true : false} /> */}
            </View>
            <Logout />
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({})
