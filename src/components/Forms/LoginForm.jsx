import { reduxForm, Field } from "redux-form"
import styles from "./Form.module.css"
import Input from "../Input/Input"
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary"

const inputStyle = {
    width: "250px",
    margin: "5px"
}

export const LoginForm = props => {
    return <form onSubmit={ props.handleSubmit } className={ styles.form }>
        <Field
            name="login"
            component={ Input }
            style={ inputStyle }
            placeholder="Логин"
        />
        <Field
            name="password"
            component={ Input }
            style={ inputStyle }
            type="password"
            placeholder="Пароль"
        />
        <ButtonPrimary style={ {padding: "10px"} }>
            Войти
        </ButtonPrimary>
    </form>
}

export default reduxForm({
    form: "loginForm"
})(LoginForm)