import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary"
import styles from "./TextAreaButton.module.css"

const TextAreaButton = ({initialValue, onSubmit, children, rollBackOnSubmit, ...props}) => {
    
    const [value, setValue] = useState(initialValue)

    const onTextAreaChange = e => {
        e.preventDefault()
        setValue(e.target.value)
    }

    const onButtonClick = e => {
        e.preventDefault()
        onSubmit(value)
        if (rollBackOnSubmit)
            setValue(initialValue)
    }

    return <>
        <textarea
            value={ value }
            onChange={ onTextAreaChange }
            className={ styles.textArea }
            {...props}
        ></textarea>
        <ButtonPrimary
            style={ {padding: "10px"} }
            onClick={ onButtonClick }
        >
            { children }
        </ButtonPrimary>
    </>
}

export default TextAreaButton