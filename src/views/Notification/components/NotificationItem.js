import React, { useState } from "react";
import { FiVoicemail } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../../store/userinfo/notificationSlice";
import { setNotificationAsViewed } from "../../../services/NotificationService";
import { useNavigate } from "react-router-dom";
import { getGoal } from "../../../services/Module3/GoalService";

function NotificationItem({ item }) {
	const {
		id,
		item_id,
		name,
		description,
		viewed,
		date,
		item_type,
		read_item_type,
		life_aspect
	} = item;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [wasViewed, setWasViewed] = useState(viewed);
	
	const handleItemClick = async () => {
		setWasViewed(true);
		const data = { ...item, viewed: true };
		await setNotificationAsViewed(id, data).then(
			_ => {
				dispatch(updateNotification(data));
				navigateToItem();
			}
		);
	};
	
	const navigateToItem = async () => {
		switch (item_type) {
			case "meta":
				await getGoal(item_id).then(
					response => {
						return navigate("/goal/form", { state: { goalItem: response.data } });
					}
				)
				return null;
			case "conquista":
				if (life_aspect) {
					switch (life_aspect) {
						case "Saude Fisica":
							return navigate("/circulo/fisica");
						case "Saude Mental":
							return navigate("/circulo/mental");
						case "Vida Social":
							return navigate("/circulo/social");
						case "Vida Profissional":
							return navigate("/circulo/profissional");
						case "Gestao Financeira":
							return navigate("/circulo/financeira");
					}
				}
				return null;
			case "acao":
				return navigate("/routine/action/form", { state: { itemID: item_id } });
			default:
				return null;
		}
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
