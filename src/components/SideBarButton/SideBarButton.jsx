import { NavLink } from "react-router-dom"
import { compose } from "redux"
import { connect } from "react-redux/es/exports"
import s from "./SideBarButton.module.css"
import { signOutThunk } from "../../redux/authReducer"


const SideBarButton = (props) => {
    if (props.isSignedIn)
        return <button
            className={ s.sideBarButton }
            onClick={ e => {
                e.preventDefault()
                props.signOut()
            }}
        >
            Выйти
        </button>
    return (
        <NavLink
            className={ s.sideBarButton }
            to={ props.to }
        >
            { props.children }
        </NavLink>
    )
}

export default compose(
    connect(
        state => ({isSignedIn: state.auth.isSignedIn}),
        dispatch => ({signOut: () => dispatch(signOutThunk)})
    )
)(SideBarButton)