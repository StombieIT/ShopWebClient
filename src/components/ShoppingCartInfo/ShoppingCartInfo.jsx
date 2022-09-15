import PreLoader from "../PreLoader/PreLoader"
import styles from "./ShoppingCartInfo.module.css"
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary"

const ShoppingCartInfo = ({state, ...props}) => {
    if (state.inProccess)
        return <PreLoader style={ {margin: "0 auto"} } />
    return <div className={ styles.shoppingCartInfo }>
        <div className={ [styles.block, styles.header].join(" ") }>
            Сумма заказа
        </div>
        <ul className={ [styles.block, styles.list].join(" ") }>
            {
                state.shoppingCartProducts.map(scp =>
                    <li key={ scp.id }>
                        <div>
                            { scp.product.title } x { scp.count }
                        </div>
                        <div className={ styles.price }>
                            { scp.product.price * scp.count } &#8381;
                        </div>
                    </li>
                )
            }
        </ul>
        {
            state
                .shoppingCartProducts
                .some(scp => scp.product.discount !== null)
            && <div className={ [styles.block, styles.spaceBetweened].join(" ") }>
                <div>Скидка</div>
                <div className={ styles.discount }>
                    { state
                        .shoppingCartProducts
                        .map(scp => scp.product.discount * scp.count)
                        .reduce((s1, s2) => s1 + s2) } &#8381;
                </div>
            </div>
        }
        <div className={ [styles.block, styles.spaceBetweened].join(" ") }>
            <div>Стоимость</div>
            <div className={ styles.price }>
                { state
                    .shoppingCartProducts
                    .map(scp => scp.product.price * scp.count)
                    .reduce((s1, s2) => s1 + s2) } &#8381;
            </div>
        </div>
        <ButtonPrimary style={ {margin: "5px", width: "100%", height: "50px"} }>
            Перейти к оформлению
        </ButtonPrimary>
    </div>
}

export default ShoppingCartInfo