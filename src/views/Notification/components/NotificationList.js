import Dropdown from "components/ui/Dropdown";
import NotificationIcon from "./NotificationIcon";
import { HiOutlineMailOpen } from "react-icons/hi";
import NotificationItem from "./NotificationItem";


const NotificationList = () => {
	const dropdownItems = [
		{ key: "a", name: "fazer ingles intensivo", item_type: "Plano de Ação", description: "Faltam 7 dias para concluir: ", date: "09/08/2023", viewed: true },
		{ key: "b", name: "Ganhar 5k dollares por mes", item_type: "Meta", description: "Faltam 7 dias para concluir: ", date: "09/08/2023", viewed: false },
		{ key: "c", name: "Saude Fisica", item_type: "Conquista", description: "Revise seu nivel de satisfaçao em ", date: "09/08/2023", viewed: true },
	];
	
	return (
		<div>
			<Dropdown
				renderTitle={<NotificationIcon notifications={dropdownItems} />}
				placement="bottom-end"
				menuClass="min-w-[280px] md:min-w-[400px]"
			>
				<div
					className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
					<h6>Notificações</h6>
					<HiOutlineMailOpen size="1.5em" className="stroke-2" />
				</div>
				<div className="overflow-y-auto min-h-64 max-h-72 divide-y">
					{dropdownItems.map((item) => (
						<NotificationItem item={item} />
					))}
				</div>
			</Dropdown>
		</div>
	);
};

export default NotificationList;