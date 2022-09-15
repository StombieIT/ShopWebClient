import s from "./Comments.module.css"
import Comment from "../Comment/Comment"
import PreLoader from "../PreLoader/PreLoader"
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary"
import TextAreaButton from "../TextAreaButton/TextAreaButton"

const Comments = ({state, ...props}) => {
    return <div className={ s.comments }>
        {
            props.user.isSignedIn
            && <div className={ s.block }>
                <TextAreaButton
                    placeholder="Комментарий"
                    initialValue=""
                    onSubmit={ value => props.pushComment(value) }
                    rollBackOnSubmit
                >
                    Отправить
                </TextAreaButton>
            </div>
        }
        {
            state.pageItems.map(comment =>
                <Comment
                    key={ comment.id }
                    state={ comment }
                    ableToManipulate={ comment.author.id === props.user.id }
                    updateComment={ text => props.updateComment(comment.id, text) }
                    deleteComment={ () => props.deleteComment(comment.id) }
                />)
        }
        {
            state.inProccess
            ? <PreLoader />
            : (
                state.hasNextPage
                ? <ButtonPrimary
                    style={ {padding: "10px"} }
                    onClick={ props.onButtonClick }
                >
                    Посмотреть ещё
                </ButtonPrimary>
                : <></>
            )
        }
    </div>
}

export default Comments