import { useEffect } from "react"
import { useState } from "react"

const useInput = ({
    type,
    name,
    initialValue,
    validators = []
}) => {

    const [value, setValue] = useState(initialValue)
    const [errors, setErrors] = useState([])
    const [isTouched, setIsTouched] = useState(false)
    const [isDirty, setIsDirty] = useState(false)

    useEffect(() => {
        let newErrors = []
        for (const validator in validators) {
            const validationError = validator(value)
            // If validator has returned an error
            if (validationError)
                newErrors = [...newErrors, validationError]
        }
        setErrors(newErrors)
    }, [value])

    useEffect(() => {
        if (!isDirty && errors.length !== 0 && isTouched)
            setIsDirty(true)
    }, [isTouched, errors])

    let inputInformation = {
        props: {
            name,
            type,
            onBlur: evt => {
                if (!isTouched)
                    setIsTouched(true)
            }
        }
    }

    switch (type) {
        case "text":
        case "password":
            inputInformation = {
                ...inputInformation,
                props: {
                    ...inputInformation.props,
                    value,
                    onChange: evt => setValue(evt.target.value)
                }
            }
            break
        case "file":
            inputInformation = {
                ...inputInformation,
                props: {
                    ...inputInformation.props,
                    onChange: evt => setValue([...evt.target.files]) // ???
                }
            }
            break
        default:
            throw new Error("Type of input must be either of 'text', 'password', 'file'")
    }

    return inputInformation
}