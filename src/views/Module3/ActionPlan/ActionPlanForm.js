import React, { useState } from "react";
import { Button, Input } from "../../../components/ui";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { InputLabel } from "../../../components/new";
import { addActionPlan } from "../../../store/module3/actionPlanSlice";
import { postActionPlan } from "../../../services/Module3/ActionPlanService";
import { toastFeedback } from "../../../utils/actionFeedback";
import { useDispatch } from "react-redux";

function ActionPlanForm({ goalID }) {
	const dispatch = useDispatch();
	const [actionPlan, setActionPlan] = useState();
	
	const handleAddItem = async () => {
		if (actionPlan) {
			const data = {
				value: actionPlan,
				goal: goalID
			};
			try {
				await postActionPlan(data).then(
					response => {
						dispatch(addActionPlan(response.data));
					}
				);
				setActionPlan(null);
			} catch (e) {
				console.log(e);
				toastFeedback('danger', 'Falha ao inserir Plano de Ação')
			}
		}
	};
	
	return (
		<div className="flex flex-row items-center gap-4">
			<InputLabel label="Plano de Ação">
				<Input
					className="w-[400px]"
					type="text"
					name="action_plan"
					placeholder="Plano de Ação"
					value={actionPlan}
					onChange={(e) => setActionPlan(e.target.value)} />
			</InputLabel>
			<Button
				className="mt-5"
				type="button"
				shape="circle"
				color="blue-500"
				size="sm"
				variant="twoTone"
				icon={<AiOutlinePlusCircle />}
				onClick={handleAddItem}
			/>
		</div>
	);
}

export default ActionPlanForm;
