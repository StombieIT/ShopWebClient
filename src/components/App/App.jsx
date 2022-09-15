import React from "react"
import SideBar from "../SideBar/SideBar"
import {Route, Routes} from "react-router-dom"
import s from "./App.module.css"
import Notifications from "../Notifications/Notifications"
import TestContainer from "../Test/TestContainer"
import Products from "../Products/Products"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import Product from "../Product/Product"
import PreLoader from "../PreLoader/PreLoader"
import { compose } from "redux"
import { useEffect } from "react"
import { loadAppThunk } from "../../redux/appReducer"
import { connect } from "react-redux/es/exports"
import Account from "../Account/Account"

const App = (props) => {
    if (props.inProccess)
        return <PreLoader style={ {margin: "0 auto", width: "100%"} } />
    return (
        <div className={ s.app }>
            <SideBar />
            <Routes>
                <Route path="/products/:page" element={ <Products /> } />
                <Route path="/test" element={ <TestContainer /> } />
                <Route path="/shoppingcart/:page" element={ <ShoppingCart /> } />
                <Route path="/product/:id" element={ <Product /> } />
                <Route path="/account/*" element={ <Account /> } />
            </Routes>
            <Notifications />
        </div>
    )
}

export default compose(
    connect(
        state => ({inProccess: state.app.inProccess}),
        dispatch => ({
            loadApp: () => dispatch(loadAppThunk)
        })
    ),
    Component => ({loadApp, ...props}) => {
        useEffect(() => {
            loadApp()
        }, [])
        return <Component {...props} />
    }
)(App)