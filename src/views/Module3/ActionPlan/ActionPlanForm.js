import React, { useState } from "react";
import { Button, Input } from "../../../components/ui";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { InputLabel } from "../../../components/new";

function ActionPlanForm({ actionPlanList, setActionPlanList }) {
	const [actionPlan, setActionPlan] = useState();

	const handleAddItem = () => {
		if (actionPlan) {
			setActionPlanList([
				...actionPlanList,
				{
					id: Math.floor(Math.random() * 100),
					value: actionPlan
				}
			]);
			setActionPlan(null)
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
					component={Input}
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
				onClick={() => handleAddItem()}
			/>
		</div>
	);
}

export default ActionPlanForm;
