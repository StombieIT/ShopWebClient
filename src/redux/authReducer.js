import { stopSubmit } from "redux-form"
import * as authApi from "../api/authApi"
import { loadAppThunk } from "./appReducer"
import { addNotificationActionCreator } from "./notificationsReducer"

const
    SET_IS_SIGNED_IN = "SET_IS_SIGNED_IN",
    SET_USER_INFO = "SET_USER_INFO"

const initialState = {
    isSignedIn: false,
    id: null,
    login: null,
    creationDate: null,
    avatarLink: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_SIGNED_IN:
            return {...state, isSignedIn: action.isSignedIn}
        case SET_USER_INFO:
            return {...state, ...action.userInfo}
    }
    return state
}

export const setIsSignedInActionCreator = isSignedIn => ({type: SET_IS_SIGNED_IN, isSignedIn})
export const setUserInfoActionCreator = userInfo => ({type: SET_USER_INFO, userInfo})

export const loadAuthThunk = dispatch =>
    authApi
        .get()
        .then(response => dispatch(setUserInfoActionCreator(response.data)))
        .then(response => dispatch(setIsSignedInActionCreator(true)))
        .catch(error => dispatch(setIsSignedInActionCreator(false)))

export const signInThunkCreator = userInfo => dispatch =>
    authApi
        .signIn(userInfo)
        .then(response => dispatch(setUserInfoActionCreator(response.data)))
        .then(response => dispatch(setIsSignedInActionCreator(true)))
        .then(response => dispatch(loadAppThunk))
        .catch(error => dispatch(stopSubmit("loginForm", {_error: "Неверный логин или пароль"})))

export const registerThunkCreator = userInfo => dispatch =>
    authApi
        .register(userInfo)
        .then(response => dispatch(setUserInfoActionCreator(response.data)))
        .then(response => dispatch(setIsSignedInActionCreator(true)))
        .then(response => dispatch(loadAppThunk))
        .catch(error => dispatch(addNotificationActionCreator({
            type: "error",
            text: "Не удалось создать аккаунт :/"
        })))

export const signOutThunk = dispatch =>
    authApi
        .signOut()
        .then(response => dispatch(setUserInfoActionCreator({id: null, login: null, creationDate: null, avatarLink: null})))
        .then(response => dispatch(setIsSignedInActionCreator(false)))
        .then(response => dispatch(loadAppThunk))

export default authReducer