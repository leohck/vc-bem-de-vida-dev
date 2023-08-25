import React from "react";
import ActionList from "./ActionList";
import ActionForm from "./ActionForm";

function Action({ actionPlanID }) {
	return (
		<div className="flex flex-col gap-10 h-[500px] md:h-[700px]">
			<ActionForm actionPlanID={actionPlanID} />
			<ActionList actionPlanID={actionPlanID} />
		</div>
	);
}

export default Action;
