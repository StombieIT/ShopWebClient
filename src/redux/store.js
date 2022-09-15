import { configureStore } from "@reduxjs/toolkit"
import notificationsReducer from "./notificationsReducer"
import testReducer from "./testReducer"
import productsReducer from "./productsReducer"
import shoppingCartReducer from "./shoppingCartReducer"
import productReducer from "./productReducer"
import productCommentsReducer from "./productCommentsReducer"
import shoppingCartInfoReducer from "./shoppingCartInfoReducer"
import { reducer as formReducer } from "redux-form"
import authReducer from "./authReducer"
import appReducer from "./appReducer"

const store = configureStore({
    reducer: {
        notifications: notificationsReducer,
        test: testReducer,
        products: productsReducer,
        shoppingCart: shoppingCartReducer,
        product: productReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer,
        // productComments: productCommentsReducer,
        shoppingCartInfo: shoppingCartInfoReducer
    }
})

window.store = store

export default store