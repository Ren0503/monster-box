import * as types from '../constants/types'

export default function(state = {}, action) {
    // Attention!!! The state object here refers to state.user, instead of the application state.
    switch(action.type) {
        case types.FETCH_PROFILE:
            return {
                ...state,
                user: action.payload
            }
        case types.CLEAR_PROFILE:
            return {}
        case types.UPDATE_PROFILE:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}