import * as axios from "axios"

const productApi = axios.create({
    baseURL: "https://localhost:44391/api/product",
    withCredentials: true
})

export const getProduct = id => productApi.get(`/${id}`)
export const getComments = (productId, page) => productApi.get(`/comments/?productId=${productId}&page=${page}&limit=3`)
export const updateComment = (commentId, text) => productApi.put(`/updatecomment`, {commentId, text})
export const removeComment = commentId => productApi.delete(`/removecomment/${commentId}`)
export const addComment = (productId, text) => productApi.post("/addcomment", {
    productId: productId,
    text: text
})

export default productApi