import React, { useState } from "react";
import { FiVoicemail } from "react-icons/fi";

function NotificationItem({ item }) {
	const {
		key,
		name,
		description,
		viewed,
		date,
		item_type
	} = item;
	
	const Icon = <FiVoicemail />;
	const [wasViewed, setWasViewed] = useState(viewed);
	
	const handleItemClick = () => {
		setWasViewed(true);
	};
	
	return (
		<div key={key}
		     className="flex flex-row justify-between p-5 gap-5 cursor-pointer max-h-24"
		     onClick={handleItemClick}
		>
			<div className="self-center">
				{Icon}
			</div>
			<div className="flex flex-col justify-evenly self-center">
				<p className="font-bold">{item_type}</p>
				<p>{description} <span className="font-bold">{name}</span></p>
				{item_type !== "Conquista" && <p>Previsão: {date}</p>}
			</div>
			<span className={`badge-dot ${wasViewed ? "bg-gray-300" : "bg-red-500"}`}></span>
			
		</div>
	);
}

export default NotificationItem;
