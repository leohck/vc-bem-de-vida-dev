import React from "react";
import ActionList from "./ActionList";
import ActionForm from "./ActionForm";

function Action({actionPlanID, actionList, setActionList}) {
	return (
		<div className="flex flex-col gap-10">
			<ActionForm
				actionList={actionList}
				setActionList={setActionList}
			/>
			<ActionList
				actionPlanID={actionPlanID}
				actionList={actionList}
				setActionList={setActionList}
			/>
		</div>
	);
}

export default Action;
