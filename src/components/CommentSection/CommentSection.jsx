import { useState } from "react"
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary"
import RatingBar from "../RatingBar/RatingBar"
import styles from "./CommentSection.module.css"

const CommentSection = ({
    initialValue,
    onSubmit,
    rollBackOnSubmit,
    ratingSize=5,
    initialRating=ratingSize,
    buttonText,
    ...props
}) => {
    
    const [value, setValue] = useState(initialValue)
    const [rating, setRating] = useState(initialRating)

    const onTextAreaChange = e => {
        setValue(e.target.value)
    }

    const onButtonClick = e => {
        e.preventDefault()
        onSubmit({value, rating})
        if (rollBackOnSubmit) {
            setRating(initialRating)
            setValue(initialValue)
        }
    }

    return <>
        <RatingBar
            rating={ rating }
            onChange={ newRating => setRating(newRating) }
        />
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
            { buttonText }
        </ButtonPrimary>
    </>
}

export default CommentSection