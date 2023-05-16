import Cookies from 'js-cookie';
const setItemInCookie = function (keyName, value, period) {
    
    const type = Object.prototype.toString.call(value);
    if (type === '[object Object]' || type === '[object Array]') {
        Cookies.set(keyName, JSON.stringify(value), { expires: 1 })
    } else {
        var TokeExpire = new Date(new Date().getTime() + period * 1000);
        Cookies.set(keyName, value, { expires: TokeExpire});
    }
    return true;
}
const getItemFromCookie = function(keyName) {
    const cookieData = Cookies.get(keyName);
    try {
        const result = JSON.parse(cookieData);
        return result;
    } catch (e) {
        return cookieData;
    }
}
const removeItemInCookie = function(keyName) {
    Cookies.remove(keyName)
    return true;
}

export {
    setItemInCookie,
    getItemFromCookie,
    removeItemInCookie
}