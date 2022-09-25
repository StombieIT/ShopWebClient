import styles from "./Carousel.module.css"
import rightArrow from "./arrow.png"
import { useState } from "react"

const Carousel = ({
    items,
    itemWidth,
    itemMargin,
    limit,
}) => {

    const [from, setFrom] = useState(0)

    const onLeftArrowClick = () => {
        if (from - 1 >= 0)
            setFrom(from - 1)
    }

    const onRightArrowClick = () => {
        if (from + limit < items.length)
            setFrom(from + 1)
    }

    return <div className={ styles.carousel }>
        <div className={ styles.arrowBlock } onClick={ onLeftArrowClick }>
            <img src={ rightArrow } alt={ rightArrow } className={ [styles.arrow, styles.opposite].join(" ") } />
        </div>
        <div className={ styles.itemsWrapper } style={ {width: `${itemWidth * limit}px`} }>
            <div className={ styles.items } style={ {transform: `translateX(-${from * itemWidth}px)`} }>
                {
                    items.map((item, idx) => <div key={idx} className={ styles.imageWrapper } style={ {width: `${itemWidth - itemMargin * 2}px`, margin: `${itemMargin}px`} }>
                        <img src={ item } alt={ item } />
                    </div>)
                }
            </div>
        </div>
        <div className={ styles.arrowBlock } onClick={ onRightArrowClick }>
            <img src={ rightArrow } alt={ rightArrow } className={ styles.arrow } />
        </div>
    </div>
}

export default Carousel