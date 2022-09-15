import { useDispatch } from "react-redux"
import { setFileActionCreator } from "../../redux/testReducer"
import Test from "./Test"

const TestContainer = (props) => {
    const dispatch = useDispatch()
    const setFile = (file) => dispatch(
        setFileActionCreator(file)
    )
    return <Test
        setFile={ setFile }
        {...props}
    />
}

export default TestContainer