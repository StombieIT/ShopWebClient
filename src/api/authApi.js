import * as axios from "axios"

const authApi = axios.create({
    withCredentials: true,
    baseURL: "https://localhost:44391/api/account"
})

export const get = () => authApi.get("/")
export const signIn = userInfo => authApi.post("/signin", userInfo)
export const signOut = () => authApi.get("/signout")
export const register = userInfo => authApi.post("/register", userInfo)

export default authApi