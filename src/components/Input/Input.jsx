import { useState } from "react"
import styles from "./Input.module.css"

const Input = ({input, meta, ...props}) => {
    debugger
    const
        hasError = meta.touched && meta.error
    return <div className={ styles.inputWrapper }>
        <input
            className={ hasError ? [styles.input, styles.inputError].join(" ") : styles.input }
            {...input} {...props}
        />
        { hasError && <span className={ styles.error }>{ meta.error }</span> }
    </div>
}

export default Input