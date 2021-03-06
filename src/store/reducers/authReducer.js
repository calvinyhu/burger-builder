import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/burger-builder',
}

const authStart = (state) => updateObject(state, {
    error: null, 
    loading: true
})

const authSuccess = (state, action) => updateObject(state, {
    token: action.token, 
    userId: action.userId, 
    error: null, 
    loading: false,
})

const authFail = (state, action) => updateObject(state, {
    error: action.error, 
    loading: false
})

const authLogout = (state, action) => updateObject(state, {
    token: null,
    userId: null,
})

const authSetRedirectPath = (state, action) => updateObject(state, {
    authRedirectPath: action.path
})

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START : return authStart(state, action)
        case actionTypes.AUTH_SUCCESS : return authSuccess(state, action)
        case actionTypes.AUTH_FAIL : return authFail(state, action)
        case actionTypes.AUTH_LOGOUT : return authLogout(state, action)
        case actionTypes.AUTH_SET_REDIRECT_PATH : return authSetRedirectPath(state, action)
        default : return state
    }
}

export default authReducer