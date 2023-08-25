import React, { useState } from "react";
import { Button, Input, Table } from "../../../../components/ui";
import { putActionDeadline } from "../../../../services/Module3/ActionDeadlineService";
import { toastFeedback } from "../../../../utils/actionFeedback";
import { MdDeleteForever } from "react-icons/md";
import { deleteSprintAction } from "../../../../services/Module3/SprintService";
import { useNavigate } from "react-router-dom";

const { Tr, Td } = Table;

function SprintAction({ isSprintRunning, action }) {
	const navigate = useNavigate();
	const [estimatedDeadline, setEstimatedDeadline] = useState(
		action.estimated_deadline
	);
	
	const handleSaveEstimatedDeadLine = async () => {
		await putActionDeadline(
			action.deadline_id,
			{
				estimated_deadline: estimatedDeadline
			}
		).then(
			() => {
				toastFeedback("success", "Prazo Alterado!");
			}
		);
	};
	
	const handleRemoveItemFromSprint = async () => {
		await deleteSprintAction(action.id)
			.then(() => {
				window.location.reload();
			});
	};
	
	const handleConfigureAction = () => {
		navigate("/routine/action/form", { state: { itemID: action.action_id } });
	};
	
	return (
		<Tr key={action.id}>
			<Td>
				<a onClick={handleConfigureAction}>
					{action.action_name}
				</a>
			</Td>
			<Td>
				{action.action_plan_name}
			</Td>
			<Td>
				{action.read_status}
			</Td>
			<Td>
				<Input
					type="date"
					name="estimated_deadline"
					className="w-[150px]"
					value={estimatedDeadline}
					onChange={(e) => setEstimatedDeadline(e.target.value)}
					onBlur={handleSaveEstimatedDeadLine}
				/>
			</Td>
			{!isSprintRunning && (
				<Td>
					<Button
						type="button"
						shape="circle"
						color="red-500"
						size="sm"
						variant="twoTone"
						icon={<MdDeleteForever />}
						onClick={handleRemoveItemFromSprint}
					/>
				</Td>
			)}
		</Tr>
	);
}

export default SprintAction;
