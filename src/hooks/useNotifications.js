import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNotifications } from "../store/userinfo/notificationSlice";
import { useUserID } from "./useUserID";


export const useNotifications = () => {
	const dispatch = useDispatch();
	const notificationsSlice = useSelector(state => state.userinfo.notificationSlice)
	const { userID } = useUserID();
	const refreshNotificationList = () => {
		dispatch(fetchNotifications({ user_id: userID }));
	};
	
	useEffect(() => {
		refreshNotificationList();
	}, [userID]);
	
	return {
		notifications: notificationsSlice.notifications,
		refreshNotificationList
	};
}