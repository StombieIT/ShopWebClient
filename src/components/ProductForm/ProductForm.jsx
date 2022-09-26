import useInput from "../../hooks/useInput"

const notEmpty = value => {
    if (value.trim().length === 0)
        return "Значение не может быть пустым"
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

    const titleInput = useInput({
        type: "text",
        name: "title",
        initialValue: "",
        validators: [notEmpty, includesFicko]
    })

    const imagesInput = useInput({
        type: "file",
        name: "images",
        initialValue: [],
        validators: [filesAtLeast2]
    })

    const handleSubmit = evt => {
        evt.preventDefault()
    }
    return <div>
        <div>
            { JSON.stringify(titleInput) }
        </div>
        <div>
            { JSON.stringify(imagesInput) }
        </div>
        <form onSubmit={ handleSubmit }>
            <input {...titleInput.props} />
            <input {...imagesInput.props} multiple />
        </form>
    </div>
}

export default ProductForm