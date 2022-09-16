import { useEffect } from "react"
import { useState } from "react"
import ImageSection from "../ImageSection/ImageSection"
import ImageSwitcher from "../ImageSwitcher/ImageSwitcher"
import styles from "./ImageSlider.module.css"

const ImageSlider = ({data, ...props}) => {

    debugger

    const [current, setCurrent] = useState(0)

    return <div className={ styles.imageSlider }>
        <ImageSection
            data={ data[current] }
        />
        <ImageSwitcher
            data={ data }
            current={ current }
            setCurrent={ setCurrent }
        />
    </div>
}

export default ImageSlider