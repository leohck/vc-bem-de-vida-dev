import React, { useState } from "react";
import ActionPlanList from "./ActionPlanList";
import ActionPlanForm from "./ActionPlanForm";

function ActionPlan({goalID, actionPlanList, setActionPlanList}) {
	return (
		<div className="flex flex-col gap-2">
			<ActionPlanForm
				goalID={goalID}
				actionPlanList={actionPlanList}
				setActionPlanList={setActionPlanList}
			/>
			<ActionPlanList
				goalID={goalID}
				actionPlanList={actionPlanList}
				setActionPlanList={setActionPlanList}
			/>
		</div>
	);
}

export default ActionPlan;
