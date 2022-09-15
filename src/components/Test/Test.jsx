import { useState } from "react"
import { Transition } from "react-transition-group"
import styles from "./Test.module.css"
import img1 from "./1.jpeg"
import img2 from "./2.jpg"
import dio from "./dio.png"
import { useEffect } from "react"
import { useRef } from "react"

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

const Test = ({}) => {

    const [isVisible, setIsVisible] = useState(false)

    setTimeout(() => {
        setIsVisible(true)
    }, 3000)

    return <Transition in={ isVisible } timeout={3000}>
        { state => {
            debugger
            return <div
                className={ [styles.block, classes[state]].join(" ") }
            >
                Any block
            </div>
        }}
    </Transition>
}

export default Test