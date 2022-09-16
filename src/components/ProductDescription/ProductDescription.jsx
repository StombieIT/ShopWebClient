import styles from "./ProductDescription.module.css"

const ProductDescription = ({data}) => {
    return <div className={ styles.productDescription }>
        <h3 className={ styles.header }>{ data.title }</h3>
    </div>
}

export default ProductDescription