import { NavLink, Outlet, Route, Routes } from "react-router-dom"
import styles from "./Account.module.css"
import RegisterForm from "../Forms/RegisterForm"
import LoginForm from "../Forms/LoginForm"
import { compose } from "redux"
import { connect } from "react-redux"
import { registerThunkCreator, signInThunkCreator } from "../../redux/authReducer"
import withNavigate from "../../hocs/withNavigate"

const Account = props => {
    return <div className={ styles.account }>
        <NavLink
            to="/account/login"
            className={ ({isActive}) => [styles.button, styles.button1, isActive && styles.buttonActive].join(" ") }
            replace={ true }
        >
            Вход
        </NavLink>
        <NavLink
            to="/account/register"
            className={ ({isActive}) => [styles.button, styles.button2, isActive && styles.buttonActive].join(" ") }
            replace={ true }
        >
            Регистрация
        </NavLink>
        <div className={ styles.body }>
            <Routes>
                <Route path="/register" element={ <RegisterForm onSubmit={ value => props.register(value).then(() => props.navigate(-1)) } /> } />
                <Route path="/login" element={ <LoginForm onSubmit={ value => props.signIn(value).then(() => props.navigate(-1)) } /> } />
            </Routes>
        </div>
    </div>
}

export default compose(
    connect(
        null,
        dispatch => ({
            signIn: userInfo => dispatch(signInThunkCreator(userInfo)),
            register: userInfo => dispatch(registerThunkCreator(userInfo))
        })
    ),
    withNavigate
)(Account)