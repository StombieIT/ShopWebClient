import styles from "./ImageSwitcher.module.css"

const ImageSwitcher = ({data, current, setCurrent, ...props}) => {
    return <div className={ styles.imageSwitcher }>
        {
            data.map((image, idx) => <div
                key={ image.id }
                className={ [styles.imageWrapper, idx === current && styles.selected].join(" ") }
                onMouseOver={ () => setCurrent(idx) }
            >
                <img
                    src={ image.link }
                    alt={ image.id }
                    className={ styles.image } 
                />
            </div>)
        }
    </div>
}

export default ImageSwitcher