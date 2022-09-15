import s from "./Products.module.css"
import { compose } from "redux"
import { addToShoppingCartThunkCreator, loadProductsThunkCreator, removeFromShoppingCartThunkCreator } from "../../redux/productsReducer"
import asPage from "../../hocs/asPage/asPage"
import { connect } from "react-redux"
import { useEffect } from "react"
import { loadAuthThunk } from "../../redux/authReducer"
import { useNavigate } from "react-router-dom"
import withParams from "../../hocs/withParams"
import ProductCard from "../ProductCard/ProductCard"

const Products = ({state, ...props}) => {
    return <div className={ s.products }>
        {
            state.map(p =>
                <ProductCard
                    key={ p.id }
                    link={ `/product/${p.id}` }
                    state={ p }
                    isSignedIn={ props.isSignedIn }
                    onButtonClick={ () => p.isInShoppingCart ? props.removeFromShoppingCart(p.id) : props.addToShoppingCart(p.id) }
                />
            )
        }
    </div>
}

export default compose(
    withParams,
    Component => props => <Component page={ parseInt(props.params.page) } />,
    connect(
        state => ({state: state.products, isSignedIn: state.auth.isSignedIn}),
        dispatch => ({
            loadPage: page => dispatch(loadProductsThunkCreator(page)),
            addToShoppingCart: productId => dispatch(addToShoppingCartThunkCreator(productId)),
            removeFromShoppingCart: id => dispatch(removeFromShoppingCartThunkCreator(id))
        })
    ),
    asPage("/products/:page")
)(Products)