import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Caption, Drawer, Paragraph, Text, Title } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { dataContext } from '../../../App'

const DrawerContent = props => {
    const [data, dispatch] = useContext(dataContext)
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.useInfoSection}>
                        {
                            data.user ?

                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    {
                                        data.user.email === "master@gmail.com" ?
                                            <Avatar.Image
                                                source={require("../../image/logoaplikasi.png")}
                                                size={60}
                                                style={{ backgroundColor: '#FFFFFF' }} />
                                            :
                                            data.user.fotoUser === "" ?
                                                <Avatar.Icon
                                                    icon="account"
                                                    size={60}
                                                    color='#FFFFFF'
                                        
                                                    style={{ backgroundColor: '#AAAAAA' }} />
                                                :
                                                <Avatar.Image
                                                    // source={require("../../image/logoaplikasi.png")} 
                                                    source={{ uri: data.user.fotoUser }}
                                                    size={60}
                                                    style={{ backgroundColor: '#FFFFFF' }} />

                                    }

                                    <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                        <Title style={styles.title}>{data.user.nama}</Title>
                                        <Caption style={styles.caption}>{data.user.email}</Caption>
                                    </View>
                                </View>
                                : null
                        }



                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>120</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>21</Paragraph>
                                <Caption style={styles.caption}>Folowers</Caption>
                            </View>
                        </View> */}
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={(color, size) => (
                                <Icon
                                    name='home-analytics'
                                    color={color}
                                    size={24}
                                />
                            )}
                            label="Home"
                            onPress={() => props.navigation.navigate("kasir")}
                        />
                        
                        <DrawerItem
                            icon={(color, size) => (
                                <Icon
                                    name='folder-star-multiple'
                                    color={color}
                                    size={24}
                                />
                            )}
                            label="Daftar Produk"
                            onPress={() => props.navigation.navigate("daftarProduct")}
                        />
                        <DrawerItem
                            icon={(color, size) => (
                                <Icon
                                    name='account-group'
                                    color={color}
                                    size={24}
                                />
                            )}
                            label="Daftar Pasien"
                            onPress={() => props.navigation.navigate("daftarCustomer")}
                        />
                        <DrawerItem
                            icon={(color, size) => (
                                <Icon
                                    name='chart-bar'
                                    color={color}
                                    size={24}
                                />
                            )}
                            label="Laporan"
                            onPress={() => props.navigation.navigate("laporan")}
                        />
                        <DrawerItem
                            icon={(color, size) => (
                                <Icon
                                    name='ticket-percent'
                                    color={color}
                                    size={24}
                                />
                            )}
                            label="Voucher"
                            onPress={() => props.navigation.navigate("voucher")}
                        />
                        <DrawerItem
                            icon={(color, size) => (
                                <Icon
                                    name='dropbox'
                                    color={color}
                                    size={24}
                                />
                            )}
                            label="Stok Skincare"
                            onPress={() => props.navigation.navigate("daftarStok")}
                        />
                        {
                            data.user && data.user.email === 'master@gmail.com' ?
                                <DrawerItem
                                    icon={(color, size) => (
                                        <Icon
                                            name='account'
                                            color={color}
                                            size={24}
                                        />
                                    )}
                                    label="User"
                                    onPress={() => props.navigation.navigate("dataUser")}
                                />
                                : null

                        }

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={(color, size) => (
                        <Icon
                            name='exit-to-app'
                            color={color}
                            size={24}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => dispatch({ type: 'logout' })}
                />
            </Drawer.Section>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    useInfoSection: {
        padding: 20,
        backgroundColor: '#F5F5F5'
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#F4F4F4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})
