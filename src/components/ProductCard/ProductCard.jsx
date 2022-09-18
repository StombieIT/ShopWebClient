import s from "./ProductCard.module.css"
import { Link } from "react-router-dom"
import Star from "../Star/Star"
import { compose } from "redux"
import { useNavigate } from "react-router-dom"
import imagePlaceholder from "./imagePlaceholder.jpg"

const MAX_LENGTH = 175

const cut = text => text.length <= MAX_LENGTH ? text : text.substring(0, MAX_LENGTH) + "..."

const ProductCard = ({state, ...props}) => {
    return (
        <div className={ s.productCard }>
            <div className={ s.container }>
                <div className={ s.header }>
                    <Link to={ props.link } className={ s.imageWrapper }>
                        <img src={ state.images[0]?.link ?? imagePlaceholder } alt={ state.title } />
                    </Link>
                    {
                        state.discount
                        && <div className={ s.percentDiscount }>
                            -{ (state.discount * 100 / (state.price + state.discount)).toFixed() }%
                        </div>
                    }
                    {
                        state.rating
                        && <div className={ s.rating }>
                            { state.rating.toFixed(2) }
                            <Star className={ s.ratingImage } />
                        </div>
                    }
                </div>
                <div className={ s.priceWrapper }>
                    <div className={ s.price }>{ state.price } &#8381;</div>
                    {
                        state.discount
                        && <div className={ s.oldPrice }>{ state.price + state.discount } &#8381;</div>
                    }
                </div>
                <div className={ s.title }>
                    { state.title }
                </div>
                <div className={ s.description }>
                    { cut(state.description) }
                </div>
            </div>

            <button
                onClick={ props.isSignedIn ? props.onButtonClick : () => props.navigate("/account/login", {replace: true}) }
                className={ s.button }
                disabled={ state.inProccess }
            >
                { state.isInShoppingCart ? "Удалить из корзины" : "В корзину" }
            </button>
        </div>
    )
}

export default compose(
    Component => props => {
        const navigate = useNavigate()
        return <Component {...props} navigate={ navigate } />
    }
)(ProductCard)