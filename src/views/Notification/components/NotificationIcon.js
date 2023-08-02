import React from "react";
import { Badge, Button } from "../../../components/ui";
import { IoNotificationsOutline } from "react-icons/io5";

function NotificationIcon(props) {
	const {
		notifications
	} = props;
	
	const newNotifications = notifications.filter(item => item.viewed === false)
	
	const hasNotifications = newNotifications.length > 0
	
	const Icon = (
		<IoNotificationsOutline />
	);
	
	const IconWithBadge = (
		<Badge content={newNotifications.length} maxCount={9}>
			<IoNotificationsOutline />
		</Badge>
	);
	
	return (
		<section>
			<Button
				shape="circle"
				variant="plain"
				size="lg"
				icon={hasNotifications ? IconWithBadge : Icon}
			/>
		</section>
	);
}

export default NotificationIcon;
