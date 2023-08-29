import React, { useState } from "react";
import { Button, Input, Select, Table } from "../../../../components/ui";
import { putActionDeadline } from "../../../../services/Module3/ActionDeadlineService";
import { toastFeedback } from "../../../../utils/actionFeedback";
import { MdDeleteForever } from "react-icons/md";
import { deleteSprintAction } from "../../../../services/Module3/SprintService";
import { useNavigate } from "react-router-dom";
import { getStatusObjectFromValue, STATUS_OPTIONS } from "../../../../constants/action.constant";
import { postRoutineAction } from "../../../../services/RoutineActionService";

const { Tr, Td } = Table;

function SprintAction({ isSprintRunning, action }) {
	const navigate = useNavigate();
	const [estimatedDeadline, setEstimatedDeadline] = useState(
		action.estimated_deadline
	);
	const [status, setStatus] = useState(
		getStatusObjectFromValue(action.status)
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
	
	const handleSaveStatus = async () => {
		if (status.value !== action.status) {
			await postRoutineAction(
				{
					value: action.action_name,
					status: status.value
				},
				action.action_id,
			).then(
				() => {
					toastFeedback("success", "Status Alterado!");
				}
			);
		}
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
				<Select
					className="w-[150px]"
					options={STATUS_OPTIONS}
					placeholder="Status"
					value={status}
					onChange={setStatus}
					onBlur={handleSaveStatus}
				/>
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
