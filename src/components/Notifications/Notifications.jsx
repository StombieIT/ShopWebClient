import s from "./Notifications.module.css"
import Notification from "../Notification/Notification"
import { useSelector, useDispatch, connect } from "react-redux/es/exports"
import { deleteNotificationActionCreator } from "../../redux/notificationsReducer"

const Notifications = ({notifications, deleteNotification, ...props}) => {
    if (!notifications.length)
        return
    return (
        <div className={ s.notifications }>
            {
                notifications.map((n, i) =>
                    <Notification
                        key={ i }
                        deleteNotification={ () => deleteNotification(i) }
                        type={ n.type }
                    >
                        { n.text }
                    </Notification>
                )
            }
        </div>
    )
}

export default connect(
    state => ({notifications: state.notifications}),
    dispatch => ({
        deleteNotification: index => dispatch(deleteNotificationActionCreator(index))
    })
)(Notifications)