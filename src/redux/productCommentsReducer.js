const
    __ADD_PRODUCT_COMMENTS = "__ADD_PRODUCT_COMMENTS",
    PUSH_PRODUCT_COMMENT = "PUSH_PRODUCT_COMMENT"

const initialState = {}

const productCommentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case __ADD_PRODUCT_COMMENTS: {
            const stateCopy = {...state}
            stateCopy[action.productId] = {
                ...stateCopy[action.productId],
                lastPage: action.comments.page,
                hasNextPage: action.comments.hasNextPage,
                items: [...(stateCopy[action.productId]?.items ?? [] ), ...action.comments.pageItems]
            }
            return stateCopy
        }
        case PUSH_PRODUCT_COMMENT: {
            const stateCopy = {...state}
            stateCopy[action.productId] = {
                ...stateCopy[action.productId],
                items: [action.comment, ...stateCopy[action.productId].items]
            }
        }
    }
    return state
}

export const __addProductCommentsActionCreator = (productId, comments) => ({type: __ADD_PRODUCT_COMMENTS, comments})
export const pushProductComment = (productId, comment) => ({type: PUSH_PRODUCT_COMMENT, productId, comment})

export default productCommentsReducer