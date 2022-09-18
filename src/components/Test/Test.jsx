import { useState } from "react"
import { Transition } from "react-transition-group"
import styles from "./Test.module.css"
import CommentSection from "../CommentSection/CommentSection"

// const Test = ({data = [img1, img2, dio]}) => {
    
//     const [current, setCurrent] = useState(0)
    
//     const currentRef = useRef(null)

//     currentRef.current = current

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             setCurrent((current + 1) % data.length)
//         }, 6000)
//         return () => {
//             clearTimeout(timeout)
//         }
//     }, [current])

//     return <div>
//         <div className={ styles.carousel }>
//             <div className={ styles.inner } style={{ transform: `translateX(-${current * 100}%)` }}>
//                 {
//                     data.map((image, ix) => <div key={ix} className={ styles.imageWrapper }>
//                         <img src={image} alt={`Image ${ix}`} />
//                     </div>)
//                 }
//             </div>
//         </div>
//         <button onClick={ () => setCurrent((current + 1) % data.length) }>next</button>
//     </div>
// }

const classes = {
    entering: styles.entering,
    exited: styles.exited
}

// const Test = ({}) => {
//     const links = [
//         "https://news1.ru/wp-content/uploads/2021/12/16723_1.jpg",
//         "https://www.imperiasumok.ru/upload/medialibrary/9b8/9b84d2c0c41419c1d733b37630993ae8.jpg",
//         "https://yakutsk.ru/wp-content/uploads/2022/06/18/img_8576-scaled.jpg",
//         "http://uzledy.ru/wp-content/uploads/2021/01/Bread_KringleEar_botany_490838_1920x1200.jpg",
//         "https://famt.ru/wp-content/uploads/2019/05/k-chemu-snitsya-svezhiy-hleb-tolkovanie-snovideniya.jpg"
//     ]
//     return <div style={ {width: "300px"} }>
//         <ImageSlider data={ links.map((l, ix) => ({id: ix, link: l})) } />
//     </div>
// }

const Test = ({}) => {
    return <div className={ styles.block }>
        <CommentSection
            initialValue=""
            initialRating={ 1 }
            onSubmit={ (value, rating) => console.log(value, rating) }
            placeholder="Комментарий"
            buttonText="Отправить"
            rollbackOnSubmit
        />
    </div>
}

export default Test