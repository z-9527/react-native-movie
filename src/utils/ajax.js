import Toast from 'react-native-root-toast'

const BASE_URL = ''

/**
 * 处理url
 * @param url
 * @param param
 * @returns {*}
 */
function handleURL (url, param) {
    let completeUrl = BASE_URL + url
    if (param) {
        if (completeUrl.indexOf('?') === -1) {
            completeUrl = `${completeUrl}?${ObjToURLString(param)}`
        } else {
            completeUrl = `${completeUrl}&${ObjToURLString(param)}`
        }
    }
    return completeUrl
}

/**
 * 将参数对象转化为'test=1&test2=2'这种字符串形式
 * @param param
 * @returns {string}
 * @constructor
 */
function ObjToURLString (param) {
    let str = ''
    if (Object.prototype.toString.call(param) === '[object Object]') {
        const list = Object.entries(param).map(item => {
            return `${item[0]}=${item[1]}`
        })
        str = list.join('&')
    }
    return str
}

export async function get (url, param) {
    const completeUrl = handleURL(url, param)
    const response = await fetch(completeUrl, {
        credentials: 'include',
        xhrFields: {
            withCredentials: true       //跨域
        },
    })
    if (response.ok) {
        return response.json()
    } else {
        Toast.show(response.statusText || '网络错误',{
            duration:Toast.durations.SHORT,
            position:Toast.positions.CENTER
        })
        return response
    }
}

export async function post (url, parma) {
    const completeUrl = BASE_URL + url
    const response = await fetch(completeUrl, {
        credentials: 'include',
        method: 'POST',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(parma),
    })
    if (response.ok) {
        return response.json()
    } else {
        Toast.show(response.statusText || '网络错误',{
            duration:Toast.durations.SHORT,
            position:Toast.positions.CENTER
        })
        return response
    }
}