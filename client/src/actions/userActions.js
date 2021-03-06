import axios from 'axios'
import { reset } from 'redux-form'
import * as types from '../constants/types'

const AUTH_URL = '/api/auth'
const USER_URL = '/api/users'
/**
 * Authentication
 */
export function signinUser({ email, password }, historyPush, historyReplace) {
    // Using redux-thunk (instead of returning an object, return a function)
    // All redux-thunk doing is giving us arbitrary access to the dispatch function, and allow us to dispatch our own actions at any time we want
    return function (dispatch) {
        axios.post(`${AUTH_URL}/signin`, { email, password })   // axios returns a promise
            .then(response => {                             // If request is good (sign in succeeded) ...
                // - Save the JWT token (use local storage)
                localStorage.setItem('token', response.data.token)

                // - Update state to indicate user is authenticated
                dispatch({
                    type: types.AUTH_USER,
                    payload: response.data.username,
                })

                // - Redirect (PUSH) to the route '/blogs'
                historyPush('/blogs')
            })
            .catch(() => {                                  // If request is bad (sign in failed) ...
                // - Redirect (REPLACE) to the route '/signin', then show an error to the user
                historyReplace('/signin', {
                    time: new Date().toLocaleString(),
                    message: 'The email and/or password are incorrect.'
                })
            })
    }
}

export function signupUser({ email, password, firstName, lastName }, historyPush, historyReplace) {
    return function (dispatch) {
        axios.post(`${AUTH_URL}/signup`, { email, password, firstName, lastName })
            .then(response => {                             // If request is good (sign up succeeded) ...
                // - Redirect (PUSH) to the route '/signin', then show a success message to the user
                historyPush('/signin', { time: new Date().toLocaleString(), message: response.data.message })
            })
            .catch(({ response }) => {                        // If request is bad (sign up failed) ...
                // - Redirect (REPLACE) to the route '/signup', then show an error to the user
                historyReplace('/signup', { time: new Date().toLocaleString(), message: response.data.message })
            })
    }
}

export function signoutUser() {
    // - Delete the JWT token from local storage
    localStorage.removeItem('token')

    // - Update state to indicate the user is not authenticated
    return { type: types.UNAUTH_USER }
}

export function verifyJwt() {
    return function (dispatch) {
        axios.get(`${AUTH_URL}/verify_jwt`, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then((response) => {
                dispatch({
                    type: types.AUTH_USER,
                    payload: response.data.username,
                })
            })
    }
}

/**
 * User 
 */


export function fetchProfile() {
    return function (dispatch) {
        axios.get(`${USER_URL}/profile`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(response => {
            dispatch({
                type: types.FETCH_PROFILE,
                payload: response.data.user,
            })
        })
    }
}

export function clearProfile() {
    return { type: types.CLEAR_PROFILE }
}

export function updateProfile({
    firstName,
    lastName,
    description
}, historyReplace) {
    return function (dispatch) {
        axios.put(`${USER_URL}/profile`, {  // req.body (2nd parameter)
            firstName,
            lastName,
            description,
        }, {  // header (3rd parameter)
            headers: { authorization: localStorage.getItem('token') },  // require auth
        }).then((response) => {  // Update profile success
            // - Update profile
            dispatch({
                type: types.UPDATE_PROFILE,
                payload: response.data.user,
            })

            // - Update username for header
            dispatch({
                type: types.AUTH_USER,
                payload: response.data.user.firstName + ' ' + response.data.user.lastName,
            })

            // - history.replace
            historyReplace('/profile', {
                status: 'success',
                time: new Date().toLocaleString(),
                message: 'You have successfully updated your profile.',
            })
        })
            .catch(() => { // Update profile failed
                historyReplace('/profile', {
                    status: 'fail',
                    time: new Date().toLocaleString(),
                    message: 'Update profile failed. Please try again.',
                })
            })
    }
}

export function changePassword({ oldPassword, newPassword }, historyReplace) {
    return function (dispatch) {
        axios.put(`${USER_URL}/password`, {
            oldPassword,
            newPassword,
        }, {
            headers: { authorization: localStorage.getItem('token') },  // require auth
        }).then((response) => {
            dispatch(reset('settings'));  // Clear the form if success
            historyReplace('/settings', {
                status: 'success',
                time: new Date().toLocaleString(),
                message: response.data.message,
            })
        })
        .catch(({ response }) => {
            historyReplace('/settings', {
                status: 'fail',
                time: new Date().toLocaleString(),
                message: response.data.message,
            })
        })
    }
}