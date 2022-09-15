import * as shoppingCartApi from "../api/shoppingCartApi"
import { addNotificationActionCreator } from "./notificationsReducer"
import { loadShoppingCartInfoThunkCreator, setShoppingCartInfoActionCreator, unloadShoppingCartInfoThunkCreator } from "./shoppingCartInfoReducer"

const
    SET_SHOPPING_CART = "SET_SHOPPING_CART",
    SET_SHOPPING_CART_IN_PROCCESS = "SET_SHOPPING_CART_IN_PROCCESS",
    SET_SHOPPING_CART_PRODUCT_COUNT = "SET_SHOPPING_CART_PRODUCT_COUNT",
    DELETE_SHOPPING_CART_PRODUCT = "DELETE_SHOPPING_CART_PRODUCT",
    SET_SHOPPING_CART_PRODUCT_IN_PROCCESS = "SET_SHOPPING_CART_PRODUCT_IN_PROCCESS"

const initialState = {
    inProccess: true,
    page: null,
    pageExists: null,
    hasNextPage: null,
    hasPreviousPage: null,
    pageItems: []
}

const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOPPING_CART:
            return {
                ...state,
                ...{
                    ...action.shoppingCart,
                    pageItems: action.shoppingCart.pageItems.map(scp => ({...scp, inProccess: false}))
                }
            }
        case SET_SHOPPING_CART_IN_PROCCESS:
            return {...state, inProccess: action.inProccess}
        case SET_SHOPPING_CART_PRODUCT_COUNT:
            return {
                ...state,
                pageItems: state.pageItems.map(scp =>
                    scp.product.id === action.productId
                    ? {...scp, count: action.count}
                    : scp
                )
            }
        case DELETE_SHOPPING_CART_PRODUCT:
            return {
                ...state,
                pageItems: state.pageItems.filter(scp => scp.product.id !== action.productId)
            }
        case SET_SHOPPING_CART_PRODUCT_IN_PROCCESS:
            return {
                ...state,
                pageItems: state.pageItems.map(scp => scp.product.id === action.productId ? {...scp, inProccess: action.inProccess} : scp)
            }
    }
    return state
}

export const setShoppingCartActionCreator = shoppingCart => ({type: SET_SHOPPING_CART, shoppingCart})
export const setShoppingCartInProccessActionCreator = inProccess => ({type: SET_SHOPPING_CART_IN_PROCCESS, inProccess})
export const setShoppingCartProductCountActionCreator = (productId, count) => ({type: SET_SHOPPING_CART_PRODUCT_COUNT, productId, count})
export const setShoppingCartProductInProccessActionCreator = (productId, inProccess) => ({type: SET_SHOPPING_CART_PRODUCT_IN_PROCCESS, productId, inProccess})
export const deleteShoppingCartProductActionCreator = productId => ({type: DELETE_SHOPPING_CART_PRODUCT, productId})

export const loadShoppingCartThunkCreator = (page, triggerInProccess = true) => dispatch => {
    if (triggerInProccess)
        dispatch(setShoppingCartInProccessActionCreator(true))
    shoppingCartApi.getProducts(page)
    .then(response => {
        dispatch(setShoppingCartActionCreator(response.data))
        if (triggerInProccess)
            dispatch(setShoppingCartInProccessActionCreator(false))
    })
    .then(response => dispatch(loadShoppingCartInfoThunkCreator(triggerInProccess)))
    .catch(error => {
        dispatch(unloadShoppingCartThunkCreator())
        dispatch(addNotificationActionCreator({
            type: "error",
            text: "Не удалось загрузить корзину :/"
        }))
    })
}

export const unloadShoppingCartThunkCreator = () => dispatch =>
    dispatch(setShoppingCartActionCreator(initialState))

export const setShoppingCartProductCountThunkCreator = (productId, count) => dispatch => {
    Promise.all([
        dispatch(setShoppingCartProductInProccessActionCreator(productId, true))
    ])
        .then(() => shoppingCartApi.updateProduct(productId, count))
        .then(response => dispatch(setShoppingCartProductCountActionCreator(productId, count)))
        .then(response => dispatch(loadShoppingCartInfoThunkCreator()))
        .catch(error => dispatch(addNotificationActionCreator({
            type: "error",
            text: "Не удалось обновить количество позиций товара в корзине :/"
        })))
        .finally(() => dispatch(setShoppingCartProductInProccessActionCreator(productId, false)))
}

export const deleteShoppingCartProductThunkCreator = productId => (dispatch, getState) => {
    shoppingCartApi
        .removeProduct(productId)
        .then(response => dispatch(loadShoppingCartThunkCreator(getState().shoppingCart.page, false)))
        // .then(response => dispatch(loadShoppingCartInfoThunkCreator()))
        .catch(error => 
            dispatch(addNotificationActionCreator({
                type: "error",
                text: "Не удалось загрузить корзину :/"
            }))
        )
}

export default shoppingCartReducer