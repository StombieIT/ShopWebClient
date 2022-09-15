import * as axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "https://localhost:44391/api"
})

window.api = api

export const getProducts = page => api.get(`/products/?page=${page}`)
export default api