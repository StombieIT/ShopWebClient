const
    ADD_NOTIFICATION = "ADD_NOTIFICATION",
    DELETE_NOTIFICATION = "DELETE_NOTIFICATION"

let initialState = []

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return [...state, action.notification]
        case DELETE_NOTIFICATION:
            return state.filter((n, i) => i !== action.index)
    }
    return state
}

export const addNotificationActionCreator = notification => {
    return {
        type: ADD_NOTIFICATION,
        notification: notification
    }
}

export const deleteNotificationActionCreator = index => {
    return {
        type: DELETE_NOTIFICATION,
        index: index
    }
}

export default notificationsReducer