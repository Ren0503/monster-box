import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authReducer from './authReducer'
import profileReducer from './profileReducer'
import blogReducer from './blogReducer'
import commentReducer from './commentReducer'

const rootReducer = combineReducers({
    form: formReducer,                  // the form property of state is going to be produced by ReduxForm reducer
    auth: authReducer,
    profile: profileReducer,
    blogs: blogReducer,
    comments: commentReducer
})

export default rootReducer