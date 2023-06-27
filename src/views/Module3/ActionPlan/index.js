import React, { useState } from "react";
import ActionPlanList from "./ActionPlanList";
import ActionPlanForm from "./ActionPlanForm";

function ActionPlan({actionPlanList, setActionPlanList}) {
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
