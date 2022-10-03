import { useEffect } from "react"
import { useState } from "react"
import imagePlaceholder from "./imagePlaceholder.png"
import styles from "./ProductForm.module.css"
import useInput from "../../hooks/useInput"
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary"

const minLength = min => value => {
    if (value.length < min) {
        return ``
    }
}

const notEmpty = value => {
    if (value.trim().length === 0) {
        return "Значение не может быть пустым"
    }
    return
}

const includesFicko = value => {
    if (!value.includes("ficko"))
        return "Значение должно содержать 'ficko'"
    return
}

const filesAtLeast = atLeast => files => {
    if (files.length < atLeast)
        return `Минимальное количество прикреплённых файлов - ${atLeast}`
    return
}

const filesAtLeast2 = filesAtLeast(2)

const ProductForm = ({
    onSubmit
}) => {

    const [isValid, setIsValid] = useState(false)

    const [imagesLabelDragMode, setImagesLabelDragMode] = useState(false)

    const titleInput = useInput({
        type: "text",
        name: "title",
        initialValue: "",
        validators: [notEmpty, includesFicko]
    })

    const description = useInput({
        type: "text",
        name: "description",
        initialValue: "",
        validators: []
    })

    const imagesInput = useInput({
        type: "file",
        name: "images",
        initialValue: [],
        validators: [filesAtLeast2]
    })

    useEffect(() => {
        setIsValid(!titleInput.isDirty && !titleInput.isDirty)
    }, [titleInput.isDirty, imagesInput.isDirty])

    const handleSubmit = evt => {
        evt.preventDefault()
        const formData = new FormData()
        formData.append(titleInput.props.name, titleInput.props.value)
        imagesInput.value.forEach(image => formData.append(imagesInput.props.name, image))
        onSubmit(formData)
    }

    return <form onSubmit={ handleSubmit } className={ styles.productForm }>
            <input {...titleInput.props} />
            <label htmlFor=""></label>
            <input {...imagesInput.props} id={ imagesInput.props.name } hidden multiple />
            <label
                htmlFor={ imagesInput.props.name }
                className={ imagesLabelDragMode ? [styles.imageLabel, styles.dragMode].join(" ") : styles.imageLabel }
                onDragEnter={ evt => setImagesLabelDragMode(true) }
                onDragLeave={ evt => setImagesLabelDragMode(false) }
                onDrop={ () => console.log("dropped") }
            >
                fickalis
                {/* <img src={ imagePlaceholder } alt={ imagesInput.props.name } /> */}
            </label>
            <ButtonPrimary
                disabled={ !isValid }
                style={ {padding: "10px"} }
            >
                Отправить
            </ButtonPrimary>
    </form>
}

export default ProductForm