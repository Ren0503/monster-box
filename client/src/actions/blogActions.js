import axios from 'axios'
import { reset } from 'redux-form'
import * as types from '../constants/types'

const BLOG_URL = '/api/blogs'

export function fetchBlogs(keyword = '') {
    return function (dispatch) {
        axios.get(`${BLOG_URL}?keyword=${keyword}`).then((response) => {
            dispatch({
                type: types.FETCH_BLOGS,
                payload: response.data,
            })
        })
    }
}

export function createBlog({
    title,
    description,
    categories,
    content,
    image,
}, historyPush, historyReplace) {
    return function (dispatch) {
        axios.post(`${BLOG_URL}`, {
            title,
            description,
            categories,
            content,
            image,
        }, {
            headers: { authorization: localStorage.getItem('token') },  // require auth
        }).then((response) => {
            dispatch({
                type: types.CREATE_BLOG,
                payload: response.data,
            })
            historyPush(`/blogs/${response.data._id}`)
        }).catch(({ response }) => {
            historyReplace('/blogs/new', {
                time: new Date().toLocaleString(),
                message: response.data.message,
            })
        })
    }
}

export function fetchBlog(id) {
    return function (dispatch) {
        axios.get(`${BLOG_URL}/${id}`).then(response => {
            // console.log(response)
            dispatch({
                type: types.FETCH_BLOG,
                payload: response.data,
            })
        })
    }
}

export function updateBlog({
    _id,
    title,
    description,
    categories,
    content,
    image,
}, onEditSuccess, historyReplace) {
    return function (dispatch) {
        axios.put(`${BLOG_URL}/${_id}`, {
            _id,
            title,
            description,
            categories,
            content,
            image,
        }, {
            headers: { authorization: localStorage.getItem('token') },  // require auth
        }).then((response) => {
            dispatch({
                type: types.UPDATE_BLOG,
                payload: response.data,
            })
            onEditSuccess()
            historyReplace(`/blogs/${_id}`, null)
        }).catch(({ response }) => {
            historyReplace(`/blogs/${_id}`, {
                time: new Date().toLocaleString(),
                message: response.data.message,
            })
        })
    }
}

export function deleteBlog(id, historyPush) {
    return function (dispatch) {
        axios.delete(`${BLOG_URL}/${id}`, {
            headers: { authorization: localStorage.getItem('token') },  // require auth
        }).then((response) => {
            dispatch({
                type: types.DELETE_BLOG,
                payload: id,
            })
        })
        historyPush('/blogs')
    }
}

export function fetchMyBlogs() {
    return function (dispatch) {
        axios.get(`${BLOG_URL}/my/blogs`, {
            headers: { authorization: localStorage.getItem('token') },  // require auth
        }).then((response) => {
            dispatch({
                type: types.FETCH_BLOGS,
                payload: response.data,
            })
        })
    }
}

export function fetchBlogsByAuthor(authorId) {
    return function (dispatch) {
        axios.get(`${BLOG_URL}/by/${authorId}`, {
            headers: { authorization: localStorage.getItem('token') },  // require auth
        }).then((response) => {
            dispatch({
                type: types.FETCH_BLOGS,
                payload: response.data,
            })
        })
    }
}

/**
 * Blog Comments
 */

export function createComment({ comment, blogId }, clearTextEditor, historyReplace) {
    return function (dispatch) {
        axios.post(`${BLOG_URL}/comments/${blogId}`, { content: comment }, {
            headers: { authorization: localStorage.getItem('token') },  // require auth
        }).then((response) => {                             // If success, clear the text editor
            dispatch({
                type: types.CREATE_COMMENT,
                payload: response.data,
            })
            dispatch(reset('comment_new'))                  // - Clear form value (data)
            clearTextEditor()                               // - Clear text editor (UI)
            historyReplace(`/blogs/${blogId}`, null)        // - clear alert message
        }).catch(({ response }) => {                          // If fail, render alert message
            // failure reason: un-authenticated
            if (!response.data.message) {
                return historyReplace(`/blogs/${blogId}`, {
                    time: new Date().toLocaleString(),
                    message: 'You must sign in before you can post new comment.',
                })
            }

            // failure reason: comment is empty
            historyReplace(`/blogs/${blogId}`, {
                time: new Date().toLocaleString(),
                message: response.data.message,
            })
        })
    }
}

export function fetchComments(blogId) {
    return function (dispatch) {
        axios.get(`${BLOG_URL}/comments/${blogId}`).then((response) => {
            dispatch({
                type: types.FETCH_COMMENTS,
                payload: response.data,
            })
        })
    }
}

/**
 * Check authority: Check if the user has the authority to make change to a specific post
 */
export function checkAuthority(blogId) {
    return function (dispatch) {
        axios.get(`${BLOG_URL}/allow_edit_or_delete/${blogId}`, {
            headers: { authorization: localStorage.getItem('token') },  // require auth
        }).then((response) => {
            dispatch({
                type: types.CHECK_AUTHORITY,
                payload: response.data.allowChange,
            })
        }).catch(() => {  // If an user is un-authorized, he/she cannot make change to any blogs
            dispatch({
                type: types.CHECK_AUTHORITY,
                payload: false,
            })
        })
    }
}