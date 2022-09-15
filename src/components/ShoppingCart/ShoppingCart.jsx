import { compose } from "redux"
import {
    deleteShoppingCartProductThunkCreator,
    loadShoppingCartThunkCreator,
    setShoppingCartProductCountThunkCreator,
    unloadShoppingCartThunkCreator,
} from "../../redux/shoppingCartReducer"
import { connect } from "react-redux"
import styles from "./ShoppingCart.module.css"
import ShoppingCartProduct from "../ShoppingCartProduct/ShoppingCartProduct"
import withAuthRedirect from "../../hocs/withAuthRedirect"
import withParams from "../../hocs/withParams"
import Paginator from "../Paginator/Paginator"
import { useEffect } from "react"
import { loadShoppingCartInfoThunkCreator } from "../../redux/shoppingCartInfoReducer"
import PreLoader from "../PreLoader/PreLoader"
import ShoppingCartInfo from "../ShoppingCartInfo/ShoppingCartInfo"
import Banner from "../Banner/Banner"
import shoppingCartPlaceHolder from "./shoppingCartPlaceHolder.svg"

export const ShoppingCart = ({state, ...props}) => {

    useEffect(() => {
        props.loadPage(props.page)
    }, [props.page])
    if (state.inProccess)
        return <PreLoader style={ {margin: "0 auto"} }/>
    if (!state.pageExists)
        return <div>Здесь пока пусто :/</div>
    return <div className={ styles.shoppingCartWrapper }>
        <div className={ styles.shoppingCart }>
            { state.pageItems.map(scp =>
                <ShoppingCartProduct
                    state={ scp }
                    key={ scp.id }
                    countIncrement={ () => props.setShoppingCartProductCount(scp.product.id, scp.count + 1) }
                    countDecrement={ () => props.setShoppingCartProductCount(scp.product.id, scp.count - 1) }
                    delete={ () => props.deleteShoppingCartProduct(scp.product.id) }
                />
            ) }
            <Paginator
                toPrev={ state.hasPreviousPage && `/shoppingcart/${state.page - 1}` }
                currentPage={ state.page }
                toNext={ state.hasNextPage && `/shoppingcart/${state.page + 1}` }
            />
        </div>
        <ShoppingCartInfo
            state={ state.info }
        />
    </div>
}

export default compose(
    withParams,
    Component => props => <Component {...props} page={ parseInt(props.params.page) } />,
    connect(
        state => ({
            state: {
                ...state.shoppingCart,
                info: state.shoppingCartInfo
            },
            isSignedIn: state.auth.isSignedIn,
        }),
        dispatch => ({
            loadPage: page => dispatch(loadShoppingCartThunkCreator(page)),
            setShoppingCartProductCount: (productId, count) => dispatch(setShoppingCartProductCountThunkCreator(productId, count)),
            deleteShoppingCartProduct: productId => dispatch(deleteShoppingCartProductThunkCreator(productId)),
        })
    ),
    withAuthRedirect
)(ShoppingCart)