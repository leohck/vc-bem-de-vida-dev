import React, { useState } from "react";
import { Badge, Button } from "../../../components/ui";
import { IoNotificationsOutline } from "react-icons/io5";

function NotificationIcon() {
	const [notifications, setNotifications] = useState([]);
	const [enable, setEnable] = useState(false);
	
	const Icon = (
		<IoNotificationsOutline />
	);
	
	const IconWithBadge = (
		<Badge content={10} maxCount={9}>
			<IoNotificationsOutline />
		</Badge>
	);
	
	const hasNotifications = true;
	
	return (
		<section>
			<Button
				shape="circle"
				variant="plain"
				size="lg"
				icon={enable ? IconWithBadge : Icon}
				onClick={() => {
					setEnable(!enable)
				}}
			/>
		</section>
	);
}

export default NotificationIcon;
