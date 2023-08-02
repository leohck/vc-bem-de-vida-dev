import React, { useState } from "react";
import { FiVoicemail } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../../store/userinfo/notificationSlice";
import { setNotificationAsViewed } from "../../../services/NotificationService";

function NotificationItem({ item }) {
	const {
		id,
		name,
		description,
		viewed,
		date,
		item_type,
		read_item_type,
	} = item;
	const dispatch = useDispatch();
	const [wasViewed, setWasViewed] = useState(viewed);
	
	const handleItemClick = async () => {
		setWasViewed(true);
		const data = {...item, viewed: true}
		await setNotificationAsViewed(id, data).then(
			_ => {
				dispatch(updateNotification(data))
			}
		)
	};
	
	return (
		<div key={id}
		     className="flex flex-row justify-between p-5 gap-5 cursor-pointer max-h-24"
		     onClick={handleItemClick}
		>
			<div className="flex flex-col justify-evenly self-center">
				<p className="font-bold">{read_item_type}</p>
				<p className="font-bold">{name}</p>
				<p>{description}</p>
				{item_type !== "conquista" ? <p>Previsão: {date}</p> : null}
			</div>
			<span className={`flex-none badge-dot ${wasViewed ? "bg-gray-300" : "bg-red-500"}`}></span>
			
		</div>
	);
}

export default NotificationItem;
