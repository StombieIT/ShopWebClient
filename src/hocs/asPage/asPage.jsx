import s from "./Page.module.css"
import Paginator from "../../components/Paginator/Paginator"
import PreLoader from "../../components/PreLoader/PreLoader"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

const asPage = urlPattern => Component => ({state, page, loadPage, ...props}) => {

    useEffect(() => loadPage(page), [page])
    const urlPatternSplitted = urlPattern.split(":page")

    return <div className={ s.page }>
        {
            state.inProccess
            ? <PreLoader />
            : <>
                <Component state={ state.pageItems } {...props} />
                <Paginator
                    toPrev={ state.hasPreviousPage && urlPatternSplitted.join(state.page - 1) }
                    currentPage={ state.page }
                    toNext={ state.hasNextPage && urlPatternSplitted.join(state.page + 1) }
                />
            </>
        }
    </div>
}

export default asPage