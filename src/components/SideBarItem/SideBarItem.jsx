import React from "react"
import { Link } from "react-router-dom"
import s from "./SideBarItem.module.css"
import { useLocation } from "react-router-dom"

const SideBarItem = ({triggerWhen, to, children, ...props}) => {
    const location = useLocation()
    return (
        <Link
            className={ triggerWhen(location.pathname) ? [s.sideBarItem, s.active].join(" ") : s.sideBarItem }
            to={ to }
        >
            { children }
        </Link>
    )
}

export default SideBarItem