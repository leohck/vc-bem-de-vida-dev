import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Action from "../Action";


function ActionPlanConfigureForm() {
	const { state } = useLocation();
	const action_plan_id = state.actionPlanItem.id;
	const [actionPlanItem, setActionPlanItem] = useState();

	useEffect(() => {
		try {
			const { actionPlanItem } = state;
			setActionPlanItem(actionPlanItem);
		} catch (e) {
			setActionPlanItem(null);
		}
	}, [state]);
	
	return (
		<div>
			<div className="flex flex-row items-center justify-center mb-10">
				{actionPlanItem ? (
					<div className="flex flex-col items-center">
						<h3>Plano de Ação</h3>
						<h3>{actionPlanItem.value}</h3>
					</div>
				) : (
					<h3>Plano de Ação</h3>
				)}
			</div>
			<div className="flex flex-col gap-10 justify-center md:flex-row">
				<Action actionPlanID={action_plan_id} />
			</div>
		</div>
	);
}

export default ActionPlanConfigureForm;
