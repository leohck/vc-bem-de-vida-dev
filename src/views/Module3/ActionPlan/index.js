import React, { useState } from "react";
import ActionPlanList from "./ActionPlanList";
import ActionPlanForm from "./ActionPlanForm";

function ActionPlan() {
	const [actionPlanList, setActionPlanList] = useState([
		{ id: 1, value: "Começar Academia" },
		{ id: 2, value: "Ir nutricionista" }
	]);

	return (
		<div className="flex flex-col gap-2">
			<ActionPlanForm
				actionPlanList={actionPlanList}
				setActionPlanList={setActionPlanList}
			/>
			<ActionPlanList
				actionPlanList={actionPlanList}
				setActionPlanList={setActionPlanList}
			/>
		</div>
	);
}

export default ActionPlan;
