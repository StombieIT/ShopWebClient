import { Navigate } from "react-router-dom"

const withAuthRedirect = Component => props => {
    if (!props.isSignedIn)
        return <Navigate to="/account/login" />
    return <Component {...props} />
}

export default withAuthRedirect