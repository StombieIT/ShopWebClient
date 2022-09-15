import * as axios from "axios"

const shoppingCartApi = axios.create({
    baseURL: "https://localhost:44391/api/shoppingcart",
    withCredentials: true
})

export const addProduct = productId => shoppingCartApi.post(`/addproduct/${productId}`)
export const removeProduct = productId => shoppingCartApi.delete(`/removeproduct/${productId}`)
export const getProducts = page => shoppingCartApi.get(`/products/?page=${page}&limit=3`)
export const updateProduct = (productId, count) => shoppingCartApi.put("/updateproduct", {productId, count})
export const getInfo = () => shoppingCartApi.get("/info")
export const get = () => shoppingCartApi.get("/")
export const create = () => shoppingCartApi.post("/create")