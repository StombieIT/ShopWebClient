import s from "./ShoppingCartProduct.module.css"
import defaultImage from "./defaultImage.jpeg"

const ShoppingCartProduct = ({state, ...props}) => {
    return <div className={ s.shoppingCartProduct }>
        <div className={ s.image }>
            <div className={ s.imageWrapper }>
                <img src={ state.product.imageLink ?? defaultImage } alt={ state.title } />
            </div>
        </div>
        <div className={ s.body }>
            <div className={ s.title }>
                { state.product.title }
            </div>
            <div className={ s.description }>
                { state.product.description }
            </div>
        </div>
        <div className={ s.price }>
            { state.product.price } &#8381;
        </div>
        <div className={ s.footer }>
            <div className={ s.counter }>
                {
                    state.count > 1
                    ? <button
                        className={ [s.counterItem, s.clickable].join(" ") }
                        onClick={ props.countDecrement }
                        disabled={ state.inProccess }
                    >
                        -
                    </button>
                    : <div className={ [s.counterItem, s.notClickable].join(" ") }>-</div>
                }
                <div className={ s.count }>
                    { state.count }
                </div>
                <button
                    className={ [s.counterItem, s.clickable].join(" ") }
                    onClick={ props.countIncrement }
                    disabled={ state.inProccess }
                >
                    +
                </button>
            </div>
            <button
                className={ s.button }
                onClick={ props.delete }
                disabled={ state.inProccess }
            >
                Удалить
            </button>
        </div>
    </div>
}
export default ShoppingCartProduct