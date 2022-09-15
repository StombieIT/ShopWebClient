import s from "./Paginator.module.css"
import { Link } from "react-router-dom"

const Paginator = ({toPrev, currentPage, toNext, props}) => {
    return (
        <div className={ s.paginator }>
            {
                toPrev
                ? <Link className={ s.clickable } to={ toPrev }>&#60;</Link>
                : <div className={ s.notClickable }>&#60;</div>
            }
            <div className={ s.notClickable }>
                { currentPage }
            </div>
            {
                toNext
                ? <Link className={ s.clickable } to={ toNext }>&#62;</Link>
                : <div className={ s.notClickable }>&#62;</div>
            }
        </div>
    )
}

export default Paginator