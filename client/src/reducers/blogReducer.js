import _ from 'lodash'
import * as types from '../constants/types'

export default function (state = {}, action) {
    // Attention!!! The state object here refers to state.blogs, instead of the application state.
    switch(action.type) {
        case types.FETCH_BLOGS:
            return _.mapKeys(action.payload, '_id')
        case types.CREATE_BLOG:
            return {
                ...state,
                [action.payload._id]: action.payload
            }
        case types.FETCH_BLOG:
            return {
                ...state,
                [action.payload._id]: action.payload
            }
        case types.UPDATE_BLOG:
            return {
                ...state,
                [action.payload._id]: action.payload
            }
        case types.DELETE_BLOG:
            return _.omit(state, action.payload)
        default:
            return state
    }
}