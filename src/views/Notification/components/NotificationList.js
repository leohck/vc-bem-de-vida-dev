import Dropdown from "components/ui/Dropdown";
import NotificationIcon from "./NotificationIcon";
import { HiOutlineMailOpen } from "react-icons/hi";
import NotificationItem from "./NotificationItem";
import { useNotifications } from "../../../hooks/useNotifications";


const NotificationList = () => {
	const {notifications, refreshNotificationList} = useNotifications();

	return (
		<div>
			<Dropdown
				renderTitle={<NotificationIcon notifications={notifications} />}
				placement="bottom-end"
				menuClass="min-w-[280px] md:min-w-[400px]"
			>
				<div
					className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
					<h6>Notificações</h6>
					<HiOutlineMailOpen size="1.5em" className="stroke-2" />
				</div>
				<div className="overflow-y-auto min-h-64 max-h-72 divide-y">
					{notifications.map((item) => (
						<NotificationItem key={item.id} item={item} />
					))}
				</div>
			</Dropdown>
		</div>
	);
};

export default NotificationList;