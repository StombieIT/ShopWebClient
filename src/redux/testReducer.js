const
    SET_FILE = "SET_FILE"

const initialState = {}

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILE:
            return {...state, file: action.file}
    }
    return state
}

export const setFileActionCreator = (file) => {
    return {
        type: SET_FILE,
        file: file
    }
}

export default testReducer