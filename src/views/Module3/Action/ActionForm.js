import React, { useState } from "react";
import { Button, Input } from "../../../components/ui";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { InputLabel } from "../../../components/new";
import { useDispatch } from "react-redux";
import { toastFeedback } from "../../../utils/actionFeedback";
import { postActionDeadline } from "../../../services/Module3/ActionDeadlineService";
import { postRoutineAction } from "../../../services/RoutineActionService";
import { addAction } from "../../../store/module3/actionSlice";
import { useUserID } from "../../../hooks/useUserID";
import { addActionDeadline } from "../../../store/module3/actionDeadlineSlice";


function ActionForm({ actionPlanID }) {
	const dispatch = useDispatch();
	const [action, setAction] = useState();
	const { userID } = useUserID();
	
	const handleAddItem = async () => {
		if (action) {
			await postRoutineAction({
				user: userID,
				value: action,
				action_plan: actionPlanID,
				action_type: "plano"
			}).then(
				async response => {
					dispatch(addAction(response.data));
					toastFeedback("success", "Ação Cadastrada");
					await postActionDeadline({
						action: response.data.id,
						action_plan: actionPlanID
					}).then(
						response => {
							addActionDeadline(response.data)
						}
					);
					window.location.reload();
				}
			);
			setAction(null);
		}
	};
	
	return (
		<div className="flex flex-row items-center gap-4">
			<InputLabel label="Nova Ação">
				<Input
					className="w-[250px] md:w-[400px]"
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
				size="md"
				variant="twoTone"
				icon={<AiOutlinePlusCircle />}
				onClick={() => handleAddItem()}
			/>
		</div>
	);
}

export default ActionForm;
