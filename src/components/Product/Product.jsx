import { useEffect } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { loadProductCommentsThunk, loadProductThunkCreator } from "../../redux/productReducer"
import {
    updateProductCommentThunkCreator,
    deleteProductCommentThunkCreator,
    pushProductCommentThunkCreator
} from "../../redux/productReducer"
import withParams from "../../hocs/withParams"
import PreLoader from "../PreLoader/PreLoader"
import s from "./Product.module.css"
import Comments from "../Comments/Comments"
import imagePlaceHolder from "./imagePlaceHolder.jpg"
import ProductDescription from "../ProductDescription/ProductDescription"

const Product = ({state, ...props}) => {

    debugger

    useEffect(
        () => props.load(props.params.id),
        [props.params.id]
    )

    if (state.inProccess)
        return <PreLoader styles={ {margin: "0 auto"} } />
    return <div className={ s.product }>
        <div className={ s.imageWrapper }>
            <img src={ state.imageLink ?? imagePlaceHolder } alt={ state.title } />
        </div>
        <ProductDescription
            data={ "" }
        />
        <Comments
            state={ state.comments }
            onButtonClick={ props.loadComments }
            updateComment={ props.updateComment }
            deleteComment={ props.deleteComment }
            pushComment={ text => props.pushComment(state.id, text) }
            user={ props.user }
        />
    </div>
}

export default compose(
    withParams,
    connect(
        state => ({
            state: state.product,
            user: {...state.auth}
        }),
        dispatch => ({
            load: productId => dispatch(loadProductThunkCreator(productId)),
            loadComments: () => dispatch(loadProductCommentsThunk),
            updateComment: (commentId, text) => dispatch(updateProductCommentThunkCreator(commentId, text)),
            deleteComment: commentId => dispatch(deleteProductCommentThunkCreator(commentId)),
            pushComment: (productId, text) => dispatch(pushProductCommentThunkCreator(productId, text))
        }),
    )
)(Product)