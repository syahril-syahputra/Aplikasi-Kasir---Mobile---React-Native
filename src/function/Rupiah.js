export const Rp = (num, rp) => {
    
    var str = Math.round(num).toString().replace("Rp ", ""), parts = false, output = [], i = 1, formatted = null;
    var str2 = num.toString().replace("Rp ", ""), parts = false, output = [], i = 1, formatted = null;
    if (str.indexOf(",") > 0) {
        parts = str.split(",");
        str = parts[0];
    }
    str = str.split("").reverse();
    for (var j = 0, len = str.length; j < len; j++) {
        if (str[j] !== ".") {
            output.push(str[j]);
            if (i % 3 === 0 && j < (len - 1)) {
                output.push(".");
            }
            i++;
        }
    }
    formatted = output.reverse().join("");
    let hurufrp = "Rp ";
    rp ? hurufrp = "Rp " : hurufrp = ""
    return (hurufrp + formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));

};

export const RpInput = value => {
    if (!value) {
        return ""
    } else if (value === "Rp ") {
        return ""
    } else {

        const get = rupiahBack(value)
        
        // console.log(get)
        if (isNaN(get)) {
            return ""
        } else {
            return Rp(value, true)
        }
    }
}

export const rupiahBack = value => {
    
    let data = value.replace("Rp ", "")
    data = data.replace(/\./g, '');

    return (data)
}
