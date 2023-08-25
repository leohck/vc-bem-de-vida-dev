import React from "react";
import { Button, Table } from "../../../../components/ui";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createSprintAction } from "../../../../services/Module3/SprintService";

const { Tr, Td } = Table;

function ActionPlanItem({ sprintID, isSprintRunning, item }) {
	const handleAddActionToSprint = async () => {
		await createSprintAction(sprintID, item.id)
			.then(() => {
				window.location.reload();
			});
	};
	return (
		<Tr key={item.id}>
			{!isSprintRunning && (
				<Td>
					<Button
						type="button"
						shape="circle"
						color="blue-500"
						size="sm"
						variant="twoTone"
						icon={<AiOutlinePlusCircle />}
						onClick={handleAddActionToSprint}
					/>
				</Td>
			)}
			<Td className="font-bold">
				{item.action_name}
			</Td>
			<Td className="font-bold">
				{item.action_plan_name}
			</Td>
			<Td className="font-bold">
				{item.priority}
			</Td>
		</Tr>
	);
}

export default ActionPlanItem;
