import React, { useState } from "react";
import { Input, Table } from "../../../../components/ui";
import { putActionDeadline } from "../../../../services/Module3/ActionDeadlineService";
import { toastFeedback } from "../../../../utils/actionFeedback";

const { Tr, Td } = Table;

function SprintAction({ action }) {
	
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
	
	return (
		<Tr key={action.id}>
			<Td>
				{action.action_name}
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
					onBlur={async () => {
						await handleSaveEstimatedDeadLine();
					}}
				/>
			</Td>
		</Tr>
	);
}

export default SprintAction;
