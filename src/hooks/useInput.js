import { useEffect } from "react"
import { useState } from "react"

const defaultInitialValue = type => {
    switch (type) {
        case "text":
        case "password":
            return ""
        case "file":
            return []
        default:
            throw new Error("Type of input must be either of 'text', 'password', 'file'")
    }
}

const useInput = ({
    type,
    name,
    initialValue = defaultInitialValue(type),
    validators = []
}) => {

    const [value, setValue] = useState(initialValue)
    const [errors, setErrors] = useState([])
    const [isTouched, setIsTouched] = useState(false)
    const [isDirty, setIsDirty] = useState(false)

    useEffect(() => {
        let newErrors = []
        for (const validator of validators) {
            const validationError = validator(value)
            // If validator has returned an error
            if (validationError)
                newErrors = [...newErrors, validationError]
        }
        setErrors(newErrors)
    }, [value])

    useEffect(() => {
        setIsDirty(errors.length !== 0 || !isTouched)
    }, [isTouched, errors])

    let inputInformation = {
        props: {
            name,
            type,
            onBlur: evt => {
                if (!isTouched)
                    setIsTouched(true)
            }
        },
        errors,
        isTouched,
        isDirty
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
                value,
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

export default useInput