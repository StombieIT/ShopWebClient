import s from "./Comment.module.css"
import editButton from "./edit.svg"
import deleteButton from "./delete.svg"
import closeButton from "./close.svg"
import avatarPlaceholder from "./avatarPlaceholder.jpg"
import { useState } from "react"
import CommentSection from "../CommentSection/CommentSection"
import { memo } from "react"
import RatingBar from "../RatingBar/RatingBar"

const Comment = ({state, ...props}) => {
    
    const [editMode, setEditMode] = useState(false)

    const onEditClick = e => {
        e.preventDefault()
        setEditMode(true)
    }

    const onDeleteClick = e => {
        e.preventDefault()
        props.deleteComment()
    }

    const onCloseClick = e => {
        e.preventDefault()
        setEditMode(false)
    }

    const onSubmit = ({value, rating}) =>
        props.updateComment({text: value, rating})
            .then(response => setEditMode(false))

    return <div className={ s.comment }>
        <div className={ s.imageWrapper }>
            <img src={ state.author.avatarLink ?? avatarPlaceholder } alt={ state.author.login } />
        </div>
        <div className={ s.body }>
            <div className={ s.info }>
                <div className={ s.login }>{ state.author.login }</div>
                {
                    props.ableToManipulate
                    && <div className={ s.buttons }>
                        {
                            editMode
                            ? <img
                                src={ closeButton }
                                alt="Отменить"
                                onClick={ onCloseClick }
                            />
                            : <>
                                <img
                                    src={ editButton }
                                    alt="Редактировать"
                                    onClick={ onEditClick }
                                />
                                <img
                                    src={ deleteButton }
                                    alt={ "Удалить" }
                                    onClick={ onDeleteClick }
                                />
                            </>
                        }
                    </div>
                }
            </div>
            {
                !editMode && <RatingBar rating={ state.rating } /> 
            }
            <div className={ s.text }>
                {
                    editMode
                    ? <>
                        <CommentSection
                            onSubmit={ onSubmit }
                            initialValue={ state.text }
                            initialRating={ state.rating }
                            buttonText="Отправить"
                        />
                    </>
                    : state.text
                }
            </div>
        </div>
    </div>
}

export default memo(Comment)