import _ from 'lodash'
import * as types from '../constants/types'

export default function (state= {}, action) {
    // Attention!!! The state object here refers to state.comments, instead of the application state.
    switch(action.type) {
        case types.FETCH_COMMENTS:
            return _.mapKeys(action.payload, '_id')
        case types.CREATE_COMMENT:
            return {
                ...state,
                [action.payload._id]: action.payload
            }
        default:
            return state
    }
}