import { useEffect } from "react"
import { useState } from "react"
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary"

const imagesValidator = formValue => {
    if (!formValue.touched)
        return
    if (formValue.value.length === 0)
        return "Минимальное количество файлов - 1"
}

const notEmptyValidator = formValue => {
    if (!formValue.touched)
        return
    if (formValue.value.trim().length === 0)
        return "Заголовок не может быть пустым"
}


const selectByType = target => {
    switch (target.type) {
        case "text":
            return target.value
        case "file":
            return [...target.files]
    }
}

const ProductForm = ({
    onSubmit,
    ...props
}) => {

    const [isFormValid, setIsFormValid] = useState(false)

    const [formValues, setFormValues] = useState({
        files: {value: [], touched: false},
        title: {value: "", touched: false}
    })

    const [formErrors, setFormErrors] = useState({})
    
    useEffect(() => {
        let newFormErrors = {}
        const filesValidationResult = imagesValidator(formValues.files)
        if (filesValidationResult)
            newFormErrors = {...newFormErrors, files: filesValidationResult}
        const titleValidationResult = notEmptyValidator(formValues.title)
        if (titleValidationResult)
            newFormErrors = {...newFormErrors, title: titleValidationResult}
        setFormErrors(newFormErrors)
    }, [formValues])

    useEffect(() => {
    }, [formErrors])

    const handleChange = ({target, ...evt}) => {
        setFormValues({
            ...formValues,
            [target.name]: {value: selectByType(target), touched: true}
        })
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        
    }

    return <div>
        <div>
            { JSON.stringify(formValues) }
        </div>
        <div>
            { JSON.stringify(formErrors) }
        </div>
        <form onSubmit={ handleSubmit }>
            <input
                type="file"
                name="files"
                onChange={ handleChange }
                multiple
            />

            {
                formErrors.files
                && <span>{ formErrors.files }</span>
            }

            <input
                name="title"
                value={ formValues.title.value }
                onChange={ handleChange }
            />

            <ButtonPrimary
                styles={ {padding: "10px"} }
            >
                Отправить
            </ButtonPrimary>
        </form>
    </div>
}



export default ProductForm