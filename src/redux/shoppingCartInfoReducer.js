import * as shoppingCartApi from "../api/shoppingCartApi"
import { addNotificationActionCreator } from "./notificationsReducer"

const
    SET_SHOPPING_CART_INFO = "SET_SHOPPING_CART_INFO",
    SET_SHOPPING_CART_INFO_IN_PROCCESS = "SET_SHOPPING_CART_INFO_IN_PROCCESS"

const initialState = {
    inProccess: true,
    totalPrice: null,
    totalDiscount: null,
    shoppingCartProducts: null,
    id: null,
    creationDate: null,
    user: null
}

const shoppingCartInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOPPING_CART_INFO:
            return {
                ...state,
                ...action.shoppingCartInfo
            }
        case SET_SHOPPING_CART_INFO_IN_PROCCESS:
            return {
                ...state,
                inProccess: action.inProccess
            }
    }
    return state
}

export const setShoppingCartInfoActionCreator = shoppingCartInfo => ({
    type: SET_SHOPPING_CART_INFO,
    shoppingCartInfo
})

export const setShoppingCartInfoInProccessActionCreator = inProccess => ({
    type: SET_SHOPPING_CART_INFO_IN_PROCCESS,
    inProccess
})

export const loadShoppingCartInfoThunkCreator = (triggerInProccess = false) => dispatch => {
    if (triggerInProccess)
        dispatch(setShoppingCartInfoInProccessActionCreator(true))
    shoppingCartApi.getInfo()
    .then(response => dispatch(setShoppingCartInfoActionCreator(response.data)))
    .then(response => {
        if (triggerInProccess)
            dispatch(setShoppingCartInfoInProccessActionCreator(false))
    })
    .catch(error => {
        dispatch(unloadShoppingCartInfoThunkCreator())
        dispatch(addNotificationActionCreator({
            type: "error",
            text: "Не удалось загрузить информацию о корзине :/"
        }))
    })
}

export const unloadShoppingCartInfoThunkCreator = () => dispatch =>
    dispatch(setShoppingCartInfoActionCreator(initialState))

export default shoppingCartInfoReducer