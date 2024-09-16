String.timestr = function () {
    const date = new Date();
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const ms = "00" + date.getMilliseconds();
    return '[' + hours + ':' + minutes.slice(-2) + ':' + seconds.slice(-2) + '.' + ms.slice(-3) + '] ';
};
String.naturalCompare = function (a, b) {
    /*
     * Natural Sort algorithm for Javascript - Version 0.6 - Released under MIT license
     * Author: Jim Palmer (based on chunking idea from Dave Koelle)
     * Contributors: Mike Grier (mgrier.com), Clint Priest, Kyle Adams, guillermo
     */
    var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi, sre = /(^[ ]*|[ ]*$)/g, dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, hre = /^0x[0-9a-f]+$/i, ore = /^0/, 
    // convert all to strings and trim()
    x = a.toString().replace(sre, '') || '', y = b.toString().replace(sre, '') || '', 
    // chunk/tokenize
    xN = x.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'), yN = y.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'), 
    // numeric, hex or date detection
    xDn = x.match(hre), yDn = y.match(hre), xD = (xDn ? parseInt(xDn[0]) : 0) || (xN.length != 1 && x.match(dre) && Date.parse(x)), yD = (yDn ? parseInt(yDn[0]) : 0) || xD && y.match(dre) && Date.parse(y) || null;
    // first try and sort Hex codes or Dates
    if (yD && xD != null)
        if (xD < yD)
            return -1;
        else if (xD > yD)
            return 1;
    // natural sorting through split numeric strings and default strings
    for (var cLoc = 0, numS = Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
        // find floats not starting with '0', string or 0 if not defined (Clint Priest)
        let oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
        let oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
        // handle numeric vs string comparison - number < string - (Kyle Adams)
        // @ts-ignore
        if (isNaN(oFxNcL) !== isNaN(oFyNcL))
            return (isNaN(oFxNcL)) ? 1 : -1;
        // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
        else if (typeof oFxNcL !== typeof oFyNcL) {
            oFxNcL += '';
            oFyNcL += '';
        }
        if (oFxNcL < oFyNcL)
            return -1;
        if (oFxNcL > oFyNcL)
            return 1;
    }
    return 0;
};
String.isNullOrEmpty = function (str) {
    return !(str && str.length);
};
String.prototype.padZero = function (length) {
    let d = String(this);
    while (d.length < length) {
        d = '0' + d;
    }
    return d;
};
String.prototype.isIDcard = function () {
    let sId = String(this);
    const aCity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    let iSum = 0;
    if (!/^\d{17}(\d|x)$/i.test(sId)) {
        // cc.log("身份证长度或格式错误", sId);
        return false;
    }
    sId = sId.replace(/x$/i, "a");
    if (!aCity.hasOwnProperty(parseInt(sId.substr(0, 2)))) {
        // cc.log("身份证地区非法", sId);
        return false;
    }
    const sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    const d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday !== (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
        // cc.log("出生日期非法", sId);
        return false;
    }
    for (let i = 17; i >= 0; i--)
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    if (iSum % 11 !== 1) {
        // cc.log("身份证号非法", sId);
        return false;
    }
    return true;
};
String.prototype.isPhoneNum = function () {
    let strPhoneNum = String(this);
    strPhoneNum = strPhoneNum.trim();
    if (!strPhoneNum)
        return false;
    const myReg = /^((1[0-9]{2})+\d{8})$/;
    return myReg.test(strPhoneNum);
};
String.prototype.isChinese = function () {
    let strChs = String(this);
    const myReg = new RegExp("^[\\u4E00-\\u9FFF]+$", "g");
    return myReg.test(strChs);
};
String.prototype.isLetterOrNumbers = function () {
    let strChs = String(this);
    let ret = true;
    const LetterAndNumbers = 'abcdefghijklmnopqrstuvwxyz1234567890';
    for (let i = 0; i < strChs.length; i++) {
        const c = strChs.charAt(i);
        if (LetterAndNumbers.indexOf(c.toLowerCase()) === -1) {
            ret = false;
            break;
        }
    }
    return ret;
};
String.prototype.trimStartChar = function (n) {
    let ret = String(this);
    let charset = [' ', '\t', '\n', '\r', '\0'];
    if (n) {
        if (!Array.isArray(n))
            charset.push(n);
        else
            charset = charset.concat(n);
    }
    if (ret.length) {
        let start = ret.charAt(0);
        while (ret.length && charset.indexOf(start) !== -1) {
            ret = ret.substr(1);
            start = ret.charAt(0);
        }
    }
    return ret;
};
String.prototype.trimEndChar = function (n) {
    let ret = String(this);
    let charset = [' ', '\t', '\n', '\r', '\0'];
    if (n) {
        if (!Array.isArray(n))
            charset.push(n);
        else
            charset = charset.concat(n);
    }
    if (ret.length) {
        let end = ret.charAt(ret.length - 1);
        while (ret.length && charset.indexOf(end) !== -1) {
            ret = ret.substr(0, ret.length - 1);
            end = ret.charAt(ret.length - 1);
        }
    }
    return ret;
};
String.prototype.trimBoth = function (n) {
    let ret = String(this);
    ret = ret.trimStartChar(n);
    ret = ret.trimEndChar(n);
    return ret;
};
String.prototype.combineUrl = function (...args) {
    let ret = String(this);
    const urlSeparator = [' ', '/', '?', '\n', '\r', '\t', '\0'];
    ret = this.trimEndChar(urlSeparator);
    for (let i = 0; i < args.length; i++) {
        let p = args[i];
        if (p && p.length) {
            ret += "/" + ("" + p).trimStartChar(urlSeparator);
        }
    }
    return ret;
};
String.prototype.cut2array = function (len, fromeEnd = false) {
    const ret = [];
    let tmp = String(this);
    if (fromeEnd) {
        while (tmp.length >= len) {
            ret.unshift(tmp.substr(tmp.length - len));
            tmp = tmp.substr(0, tmp.length - len);
        }
        if (tmp.length)
            ret.unshift(tmp);
    }
    else {
        while (tmp.length >= len) {
            ret.push(tmp.substr(0, len));
            tmp = tmp.substr(len);
        }
        if (tmp.length)
            ret.push(tmp);
    }
    return ret;
};
function wordArray2Bytes(wordArray) {
    const keyBuffer = new ArrayBuffer(wordArray.length * 4);
    const keyBytes = new DataView(keyBuffer);
    for (let i = 0; i < wordArray.length; i++) {
        keyBytes.setInt32(i * 4, wordArray[i]);
    }
    return new Uint8Array(keyBuffer);
}
String.prototype.htmlDecode = function () {
    let ret = String(this);
    if (ret && ret.length) {
        ret = ret.replace(/&amp;/g, "&");
        ret = ret.replace(/&lt;/g, "<");
        ret = ret.replace(/&gt;/g, ">");
        ret = ret.replace(/&nbsp;/g, " ");
        ret = ret.replace(/&#39;/g, "\'");
        ret = ret.replace(/&quot;/g, "\"");
        ret = ret.replace(/<p>/g, "");
        ret = ret.replace(/<br>/g, "<br/>");
        ret = ret.replace(/<\/p>/g, "<br/>");
    }
    return ret;
};
String.prototype.addUrlParams = function (obj) {
    let url = String(this);
    url = url.trimEndChar(['\\', '/', '&', '?']);
    if (!obj) {
        return url;
    }
    if (url.indexOf("?") != -1) {
        // already has params
        for (const key in obj) {
            const value = obj[key];
            if (!value)
                continue;
            url += "&" + key + "=" + value;
        }
    }
    else {
        // no params
        if (url != '')
            url += "?";
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (!key)
                continue;
            const value = obj[key];
            if (!value)
                continue;
            url += key + "=" + value + "&";
        }
        url = url.trimEndChar(['\\', '/', '&', '?']);
    }
    return url;
};
String.prototype.hashCode = function () {
    let hash1 = 5381;
    let hash2 = hash1;
    let ci = 0, si = 0;
    let c;
    let s = this.charCodeAt(si);
    while ((c = s = this.charCodeAt(si)) != 0) {
        hash1 = ((hash1 << 5) + hash1) ^ c;
        c = this.charCodeAt(si + 1);
        if (c == 0)
            break;
        hash2 = ((hash2 << 5) + hash2) ^ c;
        si += 2;
    }
    return hash1 + (hash2 * 1566083941);
};
export {};
