import infinityPreLoader from "./Infinity.svg"
import s from "./PreLoader.module.css"

const PreLoader = (props) => <img
        className={ s.preLoader }
        src={ infinityPreLoader }
        {...props}
    />

export default PreLoader