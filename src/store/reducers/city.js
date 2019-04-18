import { SET_CITY } from '../actions'

const city = (state = null, action) => {
    switch (action.type) {
        case SET_CITY:
            return action.city
        default:
            return state
    }
}

export default city