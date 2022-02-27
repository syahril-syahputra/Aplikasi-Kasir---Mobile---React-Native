const NamaFile = (type) => {

    const nama = new Date();
    const buatnama = nama.getFullYear() +""+ (nama.getMonth() + 1) + nama.getDate() + nama.getHours() + nama.getMinutes() + nama.getMilliseconds()
       
    switch (type) {
        case "image/jpeg":
            return buatnama + ".jpg"
    
        default:
            return buatnama + ".png"
            
    }
}
export default NamaFile