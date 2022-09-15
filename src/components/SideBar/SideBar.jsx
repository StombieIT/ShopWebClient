import React from "react"
import SideBarItem from "../SideBarItem/SideBarItem"
import SideBarButton from "../SideBarButton/SideBarButton"
import s from "./SideBar.module.css"
import { connect } from "react-redux"

const startsWithTriggerCreator = path => pathname => pathname.startsWith(path)

const SideBar = () => {
    return (
        <div className={ s.sidebar }>
            <SideBarItem
                to="/shoppingcart/1"
                triggerWhen={ startsWithTriggerCreator("/shoppingcart") }
            >
                Корзина
            </SideBarItem>
            <SideBarItem
                to="/products/1"
                triggerWhen={ startsWithTriggerCreator("/products") }
            >
                Товары
            </SideBarItem>
            <SideBarItem
                to="/test"
                triggerWhen={ startsWithTriggerCreator("/test") }
            >
                Test
            </SideBarItem>
            <SideBarButton
                to="/account/login"
                triggerWhen={ startsWithTriggerCreator("/account") }
            >
                Вход +
            </SideBarButton>
        </div>
    )
}

export default SideBar