import * as shoppingCartApi from "../api/shoppingCartApi"
import * as api from "../api/api"
import { addNotificationActionCreator } from "./notificationsReducer"

const
    SET_PRODUCTS = "SET_PRODUCTS",
    SET_PRODUCTS_IN_PROCCESS = "SET_IN_PROCCESS",
    SET_PRODUCT_IS_IN_SHOPPING_CART = "SET_PRODUCT_IS_IN_SHOPPING_CART",
    SET_PRODUCTS_PRODUCT_IN_PROCCESS = "SET_PRODUCTS_PRODUCT_IN_PROCCESS"

const initialState = {
    inProccess: true,
    page: null,
    pageExists: null,
    hasNextPage: null,
    hasPreviousPage: null,
    pageItems: null
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS_IN_PROCCESS:
            return {...state, inProccess: action.inProccess}
        case SET_PRODUCTS:
            return {
                ...state,
                ...{
                    ...action.products,
                    pageItems: action.products.pageItems.map(p => ({...p, inProccess: false}))
                }
            }
        case SET_PRODUCT_IS_IN_SHOPPING_CART:
            return {
                ...state,
                pageItems: state
                    .pageItems
                    .map(p => p.id === action.productId ? {...p, isInShoppingCart: action.isInShoppingCart} : p)
            }
        case SET_PRODUCTS_PRODUCT_IN_PROCCESS:
            return {
                ...state,
                pageItems: state
                    .pageItems
                    .map(p => p.id === action.productId ? {...p, inProccess: action.inProccess} : p)
            }
    }
    return state
}

export const setProductsActionCreator = (products) => ({type: SET_PRODUCTS, products})
export const setProductsInProccessActionCreator = (inProccess) => ({type: SET_PRODUCTS_IN_PROCCESS, inProccess})
export const setProductIsInShoppingCartActionCreator = (productId, isInShoppingCart) => ({type: SET_PRODUCT_IS_IN_SHOPPING_CART, productId, isInShoppingCart})
export const setProductsProductInProccess = (productId, inProccess) => ({type: SET_PRODUCTS_PRODUCT_IN_PROCCESS, productId, inProccess})

export const loadProductsThunkCreator = page => (dispatch, getState) => {
    Promise.all([dispatch(setProductsInProccessActionCreator(true))])
    .then(response => api.getProducts(page))
    .then(response => {
        dispatch(setProductsActionCreator(response.data))
        dispatch(setProductsInProccessActionCreator(false))
    })
    .catch(error => {
        dispatch(addNotificationActionCreator({
            type: "error",
            text: "Не удалось загрузить товары"
        }))
        dispatch(addNotificationActionCreator({
            type: "info",
            text: "Чтобы повторить запрос, обновите страницу"
        }))
    })
}

export const addToShoppingCartThunkCreator = productId => dispatch => {
    Promise.all([dispatch(setProductsProductInProccess(productId, true))])
        .then(response => shoppingCartApi.get().catch(error => shoppingCartApi.create()))
        .then(response => shoppingCartApi.addProduct(productId))
        .then(response => dispatch(setProductIsInShoppingCartActionCreator(productId, true)))
        .finally(() => dispatch(setProductsProductInProccess(productId, false)))
}

export const removeFromShoppingCartThunkCreator = productId => dispatch => {
    Promise.all([dispatch(setProductsProductInProccess(productId, true))])
        .then(response => shoppingCartApi.removeProduct(productId))
        .then(response => dispatch(setProductIsInShoppingCartActionCreator(productId, false)))
        .finally(() => dispatch(setProductsProductInProccess(productId, false)))
}

export default productsReducer