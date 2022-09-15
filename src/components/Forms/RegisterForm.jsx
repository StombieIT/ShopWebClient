import { Field, reduxForm } from "redux-form"
import { minLength, notStartsWith } from "../../utils/validators"
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary"
import Input from "../Input/Input"
import styles from "./Form.module.css"

const minLength5 = minLength(5)
const notStartsWithFicko = notStartsWith("ficko")

const inputStyle = {
    width: "250px",
    margin: "5px"
}

export const RegisterForm = props => {
    return <form onSubmit={ props.handleSubmit } className={ styles.form }>
        <Field
            name="login"
            component={ Input }
            style={ inputStyle }
            validate={ [minLength5, notStartsWithFicko] }
            placeholder="Логин"
        />
        <Field
            name="password"
            component={ Input }
            style={ inputStyle }
            validate={ [minLength5] }
            type="password"
            placeholder="Пароль"
        />
        <ButtonPrimary style={ {padding: "10px"} }>
            Зарегистрироваться
        </ButtonPrimary>
    </form>
}

export default reduxForm({
    form: "registerForm"
})(RegisterForm)