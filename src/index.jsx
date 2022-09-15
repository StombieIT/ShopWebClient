import React from "react"
import ReactDOMClient from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./components/App/App"
import "./nullable.css"
import "./style.css"
import store from "./redux/store"
import { Provider } from "react-redux"

const root = ReactDOMClient.createRoot(document.getElementById("root"))

root.render(
    <BrowserRouter>
        <Provider store={ store }>
            <App />
        </Provider>
    </BrowserRouter>
)