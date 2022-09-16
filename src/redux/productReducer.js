import * as productApi from "../api/productApi"
import { addNotificationActionCreator } from "./notificationsReducer"

const
    TOGGLE_PRODUCT = "TOGGLE_PRODUCT",
    SET_PRODUCT_IN_PROCCESS = "SET_PRODUCT_IN_PROCCESS",
    SET_PRODUCT_COMMENTS_IN_PROCCESS = "SET_PRODUCT_COMMENTS_IN_PROCCESS",
    ADD_PRODUCT_COMMENTS = "ADD_PRODUCT_COMMENTS",
    UPDATE_PRODUCT_COMMENT_TEXT = "UPDATE_PRODUCT_COMMENT_TEXT",
    SET_PRODUCT_COMMENT_IN_PROCCESS = "SET_PRODUCT_COMMENT_IN_PROCCESS",
    DELETE_PRODUCT_COMMENT = "DELETE_PRODUCT_COMMENT",
    PUSH_PRODUCT_COMMENT = "PUSH_PRODUCT_COMMENT"

const initialState = {
    inProccess: true,
    comments: {
        page: 0,
        pageItems: []
    }
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_PRODUCT:
            return {...initialState, ...action.product}
        case SET_PRODUCT_COMMENTS_IN_PROCCESS:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    inProccess: action.inProccess
                }
            }
        case ADD_PRODUCT_COMMENTS:
            return {
                ...state,
                comments: {
                    ...action.comments,
                    pageItems: [...state.comments.pageItems, ...action.comments.pageItems.map(comment => ({...comment, inProccess: false}))]
                }
            }
        case SET_PRODUCT_IN_PROCCESS:
            return {...state, inProccess: action.inProccess}
        case UPDATE_PRODUCT_COMMENT_TEXT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    pageItems: state
                        .comments
                        .pageItems
                        .map(comment =>
                            comment.id === action.commentId
                            ? {...comment, text: action.text}
                            : comment
                        )
                }
            }
        case SET_PRODUCT_COMMENT_IN_PROCCESS:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    pageItems: state
                        .comments
                        .pageItems
                        .map(comment =>
                            comment.id === action.commentId
                            ? {...comment, inProccess: action.inProccess}
                            : comment
                        )
                }
            }
        case DELETE_PRODUCT_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    pageItems: state
                        .comments
                        .pageItems
                        .filter(comment => comment.id !== action.commentId)
                }
            }
        case PUSH_PRODUCT_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    pageItems: [
                        action.comment,
                        ...state.comments.pageItems
                    ]
                }
            }
    }
    return state
}

export const toggleProductActionCreator = product => ({type: TOGGLE_PRODUCT, product})
export const setProductInProccessActionCreator = inProccess => ({type: SET_PRODUCT_IN_PROCCESS, inProccess})
export const addProductCommentsActionCreator = comments => ({type: ADD_PRODUCT_COMMENTS, comments})
export const setProductCommentsInProccessActionCreator = inProccess => ({type: SET_PRODUCT_COMMENTS_IN_PROCCESS, inProccess})
export const setProductCommentTextActionCreator = (commentId, text) => ({type: UPDATE_PRODUCT_COMMENT_TEXT, commentId, text})
export const setProductCommentInProccessActionCreator = (commentId, inProccess) => ({type: SET_PRODUCT_COMMENT_IN_PROCCESS, commentId, inProccess})
export const deleteProductCommentActionCreator = commentId => ({type: DELETE_PRODUCT_COMMENT, commentId})
export const pushProductCommentActionCreator = comment => ({type: PUSH_PRODUCT_COMMENT, comment})

export const loadProductCommentsThunk = (dispatch, getState) => {
    dispatch(setProductCommentsInProccessActionCreator(true))
    productApi.getComments(getState().product.id, getState().product.comments.page + 1)
        .then(response => {
            debugger
            dispatch(addProductCommentsActionCreator(response.data))
        })
        .finally(() => dispatch(setProductCommentsInProccessActionCreator(false)))
}

export const loadProductThunkCreator = productId => dispatch => {
    dispatch(setProductInProccessActionCreator(true))
    productApi
        .getProduct(productId)
        .then(response => dispatch(toggleProductActionCreator(response.data)))
        .then(response => dispatch(loadProductCommentsThunk))
        .then(response => dispatch(setProductInProccessActionCreator(false)))
}

export const updateProductCommentThunkCreator = (commentId, text) => dispatch =>
    Promise.all([dispatch(setProductCommentInProccessActionCreator(commentId, true))])
    .then(response => productApi.updateComment(commentId, text))
    .then(response => dispatch(setProductCommentTextActionCreator(commentId, text)))
    .catch(error => dispatch(addNotificationActionCreator({
        type: "error",
        text: "Не удалось обновить комментарий :/"
    })))
    .finally(() => dispatch(setProductCommentInProccessActionCreator(commentId, false)))

export const deleteProductCommentThunkCreator = commentId => dispatch =>
    Promise.all([dispatch(setProductCommentInProccessActionCreator(false))])
    .then(response => productApi.removeComment(commentId))
    .then(response => dispatch(deleteProductCommentActionCreator(commentId)))
    .catch(error => dispatch(setProductCommentInProccessActionCreator(true)))

export const pushProductCommentThunkCreator = (productId, text) => dispatch =>
    productApi
        .addComment(productId, text)
        .then(response => dispatch(pushProductCommentActionCreator(response.data)))
        .catch(error => dispatch(addNotificationActionCreator({
            type: "error",
            text: "Не удалось отправить комментарий"
        })))

export default productReducer