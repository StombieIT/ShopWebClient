import s from "./Comments.module.css"
import Comment from "../Comment/Comment"
import PreLoader from "../PreLoader/PreLoader"
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary"
import CommentSection from "../CommentSection/CommentSection"

const Comments = ({state, ...props}) => {
    return <div className={ s.comments }>
        {
            props.user.isSignedIn
            && <div className={ s.block }>
                <CommentSection
                    placeholder="Комментарий"
                    initialValue=""
                    onSubmit={ ({value, rating}) => props.pushComment({text: value, rating}) }
                    buttonText="Отправить"
                    rollBackOnSubmit
                />
            </div>
        }
        {
            state.pageItems.map(comment =>
                <Comment
                    key={ comment.id }
                    state={ comment }
                    ableToManipulate={ comment.author.id === props.user.id }
                    updateComment={ ({text, rating}) => props.updateComment({commentId: comment.id, text, rating}) }
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