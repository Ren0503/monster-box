import * as types from '../constants/types'

export default function(state = {}, action) {
    // Attention!!! The state object here refers to state.auth, instead of the application state.
    switch(action.type) {
        case types.AUTH_USER:
            return {
                ...state,
                authenticated: true,
                username: action.payload
            }
        case types.UNAUTH_USER:
            return {
                ...state,
                authenticated: false,
                username: ''
            }
        case types.CHECK_AUTHORITY:
            return {
                ...state,
                allowChange: action.payload
            }
        default :
            return state
    }
}