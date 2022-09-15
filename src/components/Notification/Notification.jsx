import s from "./Notification.module.css"
import close from "./close.svg"
import { Transition } from "react-transition-group"
import { useEffect, useState } from "react"

const getColor = (type) => {
    switch (type) {
        case "info":
            return "#0b4fb4"
        case "error":
            return "#fa0000"
    }    
}

const Notification = (props) => {

    const color = getColor(props.type)
    const notificationStyle = {
        border: `2px dashed ${color}`,
        borderLeft: `5px solid ${color}`
    }
    return <Transition>
        <div className={ s.notification } style={ notificationStyle }>
            <div className={ s.body }>
                { props.children }
            </div>
            <div className={ s.close } onClick={ props.deleteNotification } >
                <img src={ close } alt="Закрыть" />
            </div>
        </div>
    </Transition>
}

// const transitionClasses = {
//     exiting: s.exiting,
//     entering: s.entering
// }

// const Notification = (props) => {

//     const [isDisplayed, setIsDisplayed] = useState(false)

//     useEffect(() => {
//         setIsDisplayed(true)
//     }, [])

//     const color = getColor(props.type)
//     const notificationStyle = {
//         border: `2px dashed ${color}`,
//         borderLeft: `5px solid ${color}`
//     }

//     const onClose = e => {
//         e.preventDefault()
//         setIsDisplayed(false)
//     }

//     return <Transition
//         in={ isDisplayed }
//         timeout={ 400 }
//         onExiting={ props.deleteNotification }
//     >
//         {
//             state => <div className={ [s.notification, transitionClasses[state]].join(" ") } style={ notificationStyle }>
//                 <div className={ s.body }>
//                     { props.children }
//                 </div>
//                 <div className={ s.close } onClick={ onClose } >
//                     <img src={ close } alt="Закрыть" />
//                 </div>
//             </div>
//         }
//     </Transition>
// }

export default Notification