import styles from "./Test.module.css"
import CommentSection from "../CommentSection/CommentSection"
import * as axios from "axios"
import imagePlaceholder from "./imagePlaceholder.jpg"
import ProductForm from "../ProductForm/ProductForm"
import Carousel from "../Carousel/Carousel"

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
    const links = [
        "https://news1.ru/wp-content/uploads/2021/12/16723_1.jpg",
        "https://www.imperiasumok.ru/upload/medialibrary/9b8/9b84d2c0c41419c1d733b37630993ae8.jpg",
        "https://yakutsk.ru/wp-content/uploads/2022/06/18/img_8576-scaled.jpg",
        "http://uzledy.ru/wp-content/uploads/2021/01/Bread_KringleEar_botany_490838_1920x1200.jpg",
        "https://famt.ru/wp-content/uploads/2019/05/k-chemu-snitsya-svezhiy-hleb-tolkovanie-snovideniya.jpg",
        "https://baikal24.ru/public/images/upload/image1652856990920.jpg",
        "https://get.wallhere.com/photo/food-bread-basket-baking-bakery-rolls-grass-family-baked-goods-rye-bread-brown-bread-whole-grain-poppy-seeds-slices-619411.jpg",
        "https://media.farandwide.com/ba/e6/bae60ab30bf14b1d88c212b342098de0.jpg"
    ]
    return <Carousel
        items={ links }
        itemWidth={ 100 }
        itemMargin={ 7 }
        limit={ 4 }
    />
}

// const Test = ({}) => {

//     const onProductFormSubmit = formData => {
//         console.log("ura")
//     }

//     return <ProductForm
//         onSubmit={ onProductFormSubmit  }
//     />
// }

export default Test