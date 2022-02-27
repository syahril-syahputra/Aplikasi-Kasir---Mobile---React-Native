import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-native-paper'
import KategoriForm from './DataProduct/KategoriForm'
import AddKategori from './DataProduct/Modal/AddKategori'
import AddProduct from './DataProduct/Modal/AddProduct'
import ConfirmDeleteKategori from './DataProduct/Modal/ConfirmDeleteKategori'
import DetailProduct from './DataProduct/Modal/DetailProduct'
import ProductForm from './DataProduct/ProductForm'

const DataProductTablet = () => {


    const [modealAddKategori, setmodealAddKategori] = useState(false)
    const [modalEditKategori, setmodalEditKategori] = useState(false)
    const [modalConfirmDeleteKategori, setmodalConfirmDeleteKategori] = useState(false)
    const [modalAddProduct, setmodalAddProduct] = useState(false)
    const [modalDetailProduct, setmodalDetailProduct] = useState(false)
    const [modalEditProduct, setModalEditProduct] = useState(false)
    const [selectedProduct, setselectedProduct] = useState(null)
    const [selectedKategori, setselectedKategori] = useState(null)

    
    return (
        <Provider>
            <AddKategori visible={[modealAddKategori, setmodealAddKategori]} />
            <AddKategori visible={[modalEditKategori, setmodalEditKategori]} selectedKategori={selectedKategori} setSelectedKategori={setselectedKategori} />
            <ConfirmDeleteKategori selected={[selectedKategori, setselectedKategori]} visible={[modalConfirmDeleteKategori, setmodalConfirmDeleteKategori]} />
            <DetailProduct modalEdit={[modalEditProduct, setModalEditProduct]} product={selectedProduct} visible={[modalDetailProduct, setmodalDetailProduct]} />
            <AddProduct selectedKategori={selectedKategori} visible={[modalAddProduct, setmodalAddProduct]} />
            <AddProduct selectedProduct={selectedProduct} setSelectedProduct={setselectedProduct} selectedKategori={selectedKategori} visible={[modalEditProduct, setModalEditProduct]} />
            <View style={{ flex: 1, backgroundColor: '#FF6600', flexDirection: 'row' }}>

                <View style={{ width: 300, padding: 10, backgroundColor: '#EEEEEE' }}>
                    <KategoriForm
                        modalAdd={[modealAddKategori, setmodealAddKategori]}
                        selectedKategori={[selectedKategori, setselectedKategori]}
                    />
                </View>
                <View style={{ flex: 1, padding:10, backgroundColor: '#F4F4F4' }}>
                    {
                        selectedKategori ? 
                        <ProductForm 
                            selectedKategori={selectedKategori}
                            setSelectedProduct={setselectedProduct}
                            modalDeleteKategori={[modalConfirmDeleteKategori, setmodalConfirmDeleteKategori]}
                            modalEditKategori={[modalEditKategori, setmodalEditKategori]}
                            modalAdd={[modalAddProduct, setmodalAddProduct]} 
                            modalDetail={[modalDetailProduct, setmodalDetailProduct]}
                         />
                        : null
                    }
                </View>
            </View>
        </Provider>
    )
}

export default DataProductTablet

const styles = StyleSheet.create({})
