import ButtonPrimary from "../ButtonPrimary/ButtonPrimary"
import styles from "./Banner.module.css"

const Banner = ({image, children, ...props}) => {
    return <div className={ styles.banner }>
        { image }
        <ButtonPrimary {...props} >
            { children }
        </ButtonPrimary>
    </div>
}

export default Banner