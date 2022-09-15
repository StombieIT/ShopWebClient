import s from "./ButtonPrimary.module.css"

const ButtonPrimary = ({children, className, ...props}) => {
    return <button className={ [s.buttonPrimary, className].join(" ") } {...props}>
        { children }
    </button>
}

export default ButtonPrimary