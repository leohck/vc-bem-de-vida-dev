import React, { useState } from "react";
import { Field } from "formik";
import { Button, FormItem, Input } from "../../../components/ui";
import { AiOutlinePlusCircle } from "react-icons/ai";

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
			<FormItem
				label="Plano de Ação"
			>
				<Field
					className="w-[400px]"
					type="text"
					name="action_plan"
					placeholder="Plano de Ação"
					component={Input}
					onChange={(e) => setActionPlan(e.target.value)}
					value={actionPlan}
				/>
			</FormItem>
			<Button
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
