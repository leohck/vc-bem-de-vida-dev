import React, { useState } from "react";
import { Button, Input } from "../../../components/ui";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { InputLabel } from "../../../components/new";
import { useDispatch } from "react-redux";
import { toastFeedback } from "../../../utils/actionFeedback";
import { postActionDeadline } from "../../../services/Module3/ActionDeadlineService";
import { postRoutineAction } from "../../../services/RoutineActionService";
import { addAction } from "../../../store/module3/actionSlice";


function ActionForm({ actionPlanID }) {
	const dispatch = useDispatch()
	const [action, setAction] = useState();
	
	const handleAddItem = async () => {
		if (action) {
			await postRoutineAction({value: action, action_plan: [actionPlanID]}).then(
				async response => {
					dispatch(addAction(response.data))
					toastFeedback("success", "Ação Cadastrada")
					await postActionDeadline({
						action: response.data.id,
						estimated_deadline: '2024-01-01',
						action_plan: actionPlanID
					})
				}
			)
			setAction(null);
		}
	};
	
	return (
		<div className="flex flex-row items-center gap-4">
			<InputLabel label="Nova Ação">
				<Input
					className="w-[400px]"
					type="text"
					name="action"
					placeholder="Ação"
					value={action}
					onChange={(e) => setAction(e.target.value)} />
			</InputLabel>
			<Button
				className="mt-5"
				type="button"
				shape="circle"
				color="blue-500"
				size="sm"
				variant="twoTone"
				icon={<AiOutlinePlusCircle />}
				onClick={() => handleAddItem()}
			/>
		</div>
	);
}

export default ActionForm;
