import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import EscPos from "@leesiongchan/react-native-esc-pos";
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from '@brooons/react-native-bluetooth-escpos-printer';
import ImgToBase64 from 'react-native-image-base64';
import RNFS from 'react-native-fs'
import logo from "../../image/logoaplikasi.png"
import { ArhielTgl, ArhielTglFull, ArhielTglWithDay } from '../../function/ArhielTgl';

const tester = () => {
    const [isLoading, setisLoading] = useState(false)

    // let options = {
    //     width: 40,
    //     height: 30,
    //     gap: 20,
    //     direction: BluetoothTscPrinter.DIRECTION.FORWARD,
    //     reference: [0, 0],
    //     tear: BluetoothTscPrinter.TEAR.ON,
    //     sound: 0,
    //     text: [{
    //         text: 'I am a testing txt',
    //         x: 20,
    //         y: 0,
    //         fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
    //         rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
    //         xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
    //         yscal: BluetoothTscPrinter.FONTMUL.MUL_1
    //     }, {
    //         text: '你在说什么呢?',
    //         x: 20,
    //         y: 50,
    //         fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
    //         rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
    //         xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
    //         yscal: BluetoothTscPrinter.FONTMUL.MUL_1
    //     }],
    //     qrcode: [{ x: 20, y: 96, level: BluetoothTscPrinter.EEC.LEVEL_L, width: 3, rotation: BluetoothTscPrinter.ROTATION.ROTATION_0, code: 'show me the money' }],
    //     barcode: [{ x: 120, y: 96, type: BluetoothTscPrinter.BARCODETYPE.CODE128, height: 40, readable: 1, rotation: BluetoothTscPrinter.ROTATION.ROTATION_0, code: '1234567890' }],
    //     // image: [{ x: 160, y: 160, mode: BluetoothTscPrinter.BITMAP_MODE.OVERWRITE, width: 60, image: base64Image }]
    // }
    const scan = async () => {
        setisLoading(true)
        BluetoothManager.connect("DC:0D:30:79:68:DE") // the device address scanned.
            .then(async (s) => {

                // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                // await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
                // const base64 = await FileSystem.readFile(require("../../image/logoaplikasi.png"), {
                //     encoding: 'base64',
                // });
                await printheader("INES Beauty Clinic")
                await printbarang("Shampo", 32, "24.000")
                await printbarang("Sabun", 65, "25.000")
                await printbarang("Pasta Gigi", 78, "26.000")
                await printbarang("Tisu", 99, "27.000")
                await printTotalBelanja("200.000")
                await printTindakan("Facial, Laser, Suntik Botox, Makan, Tidur, Jalan, Terbang", "500.000")
                await printTotalBayar("1.500.000")
                await printFooter()

                setisLoading(false)
            }, (e) => {
                this.setState({
                    loading: false
                })
                alert(e);
            })

    }
    const printheader = async (namaApp) => {
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.printText(namaApp + "\n\r", {});
        await BluetoothEscposPrinter.printText(ArhielTglWithDay(new Date()) + "\n\r", {});
        await BluetoothEscposPrinter.printText("------------------------------\n\r", {});
    }
    const printbarang = async (nama, jumlah, total) => {
        let columnWidths = [12, 8, 12]
        await BluetoothEscposPrinter.printColumn(columnWidths,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT, BluetoothEscposPrinter.ALIGN.RIGHT],
            [nama, "X " + jumlah, total], {});
    }
    
    const printTotalBelanja = async (total) => {
        
        await BluetoothEscposPrinter.printText("------------------------------\n\r", {});
        let columnWidths = [16, 16]
        await BluetoothEscposPrinter.printColumn(columnWidths,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["Total Pembelian", total], {});
    }
    const printTindakan = async (tindakan, total) => {
        
        let columnWidths = [20, 12]
        await BluetoothEscposPrinter.printColumn(columnWidths,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            [tindakan, total], {});
    }
    const printTotalBayar = async (total) => {
        
        await BluetoothEscposPrinter.printText("------------------------------\n\r", {});
        let columnWidths = [16, 16]
        await BluetoothEscposPrinter.printColumn(columnWidths,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["Total", total], {});
    }
    const printFooter= async () => {
        
        await BluetoothEscposPrinter.printText("------------------------------\n\r", {});
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.printText("Terima Kasih\n\r", {});
        await BluetoothEscposPrinter.printText("------------------------------\n\r\n\r\n\r\n\r", {});
    }
    

    useEffect(async () => {
        // const isEnabled = await BluetoothManager.checkBluetoothEnabled();

        // console.log(isEnabled); // true/false

        // BluetoothManager.scanDevices()
        //     .then((s) => {
        //         var ss = JSON.parse(s);//JSON string
        //         console.log(ss)
        //     }, (er) => {
        //         this.setState({
        //             loading: false
        //         })
        //         alert('error' + JSON.stringify(er));
        //     });
        const base64data = await RNFS.readFile("./src/image/logoaplikasi.png", 'base64')
        console.log(base64data)
        // ImgToBase64.getBase64String()
        //     .then(base64String => console.log(base64String))
        //     .catch(err => doSomethingWith(err));
    }, [])


    return (
        <View>
            <Text>asddasdas</Text>
            {
                isLoading ?

                    <Text>Loading</Text>
                    :
                    <Button title='Scan Devicess' onPress={scan} />
            }
        </View>
    )
}

export default tester