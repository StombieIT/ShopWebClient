import styles from "./ImageSection.module.css"

const ImageSection = ({data, ...props}) => {
    return <div className={ styles.imageSection }>
        <img src={ data.link } alt={ data.id } {...props} />
    </div>
}

export default ImageSection