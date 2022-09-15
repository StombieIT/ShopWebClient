import { useParams } from "react-router-dom"

const withParams = Component => props => {
    const params = useParams()
    return <Component
        params={ params }
        {...props}
    />
}

export default withParams