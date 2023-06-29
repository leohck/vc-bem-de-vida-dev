import React, { useState } from "react";
import { Button, Input } from "../../../components/ui";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { InputLabel } from "../../../components/new";
import { postAction } from "../../../services/Module3/ActionService";
import { useDispatch } from "react-redux";
import { addAction } from "../../../store/module3/actionSlice";
import { toastFeedback } from "../../../utils/actionFeedback";



function ActionForm({ actionPlanID }) {
	const dispatch = useDispatch()
	const [action, setAction] = useState();
	
	const handleAddItem = async () => {
		if (action) {
			await postAction({value: action, action_plan: [actionPlanID]}).then(
				response => {
					dispatch(addAction(response.data))
					toastFeedback("success", "Ação Cadastrada")
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
