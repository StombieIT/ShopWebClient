import styles from "./RatingBar.module.css"
import Star from "../Star/Star"

const RatingBar = ({
    ratingSize=5,
    rating=ratingSize,
    onChange=null,
    ...props
}) => {
    let ratingElementClassName = styles.ratingElement
    if (onChange)
        ratingElementClassName = [ratingElementClassName, styles.canSelect].join(" ")
    return <div className={ styles.ratingBar } {...props}>
        {
            new Array(ratingSize)
            .fill(null)
            .map((el, ix) => <Star
                key={ ix }
                className={ ix + 1 <= rating ? ratingElementClassName : [ratingElementClassName, styles.notSelected].join(" ") }
                onClick={ () => onChange(ix + 1) }
            />)
        }
    </div>
}

export default RatingBar