import React, { useState } from "react";
import ActionPlanList from "./ActionPlanList";
import ActionPlanForm from "./ActionPlanForm";

function ActionPlan({goalID}) {
	return (
		<div className="flex flex-col gap-2">
			<ActionPlanForm goalID={goalID} />
			<ActionPlanList goalID={goalID} />
		</div>
	);
}

export default ActionPlan;
