import { loadAuthThunk } from "./authReducer"
import { loadShoppingCartInfoThunkCreator } from "./shoppingCartInfoReducer"
import { loadShoppingCartThunkCreator } from "./shoppingCartReducer"

const
    SET_APP_IN_PROCCESS = "SET_APP_IN_PROCCESS"

const initialState = {
    inProccess: true
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APP_IN_PROCCESS:
            return {...state, inProccess: action.inProccess}
    }
    return state
}

export const setAppInProccessActionCreator = inProccess => ({type: SET_APP_IN_PROCCESS, inProccess})

export const loadAppThunk = dispatch => {
    dispatch(setAppInProccessActionCreator(true))
    Promise.all([
        dispatch(loadAuthThunk)
    ])
    .finally(() => dispatch(setAppInProccessActionCreator(false)))
}

export default appReducer