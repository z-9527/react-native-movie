import { SET_CITY } from '../actions'

const city = (state = {}, action) => {
    switch (action.type) {
        case SET_CITY:
            return action.city
        default:
            return state
    }
}

export default city