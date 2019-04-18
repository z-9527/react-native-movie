import { get } from '../../utils/ajax'

export const SET_CITY = 'SET_CITY'

//城市actions
export function setCity (city) {
    return {
        type: SET_CITY,
        city
    }
}

//异步获取初始城市位置action（ redux-thunk）
export function initCity () {
    return async function (dispatch) {
        const res = await get('https://maoyan.com/ajax/cities')
        dispatch(setCity(res.geoCity))
    }
}


