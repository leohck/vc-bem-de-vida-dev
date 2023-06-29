import React from "react";
import { useLocation } from "react-router-dom";

function ActionConfigureForm() {
	const {state} = useLocation();
	return (
		<div>
			{state.actionID}
		</div>
	);
}

export default ActionConfigureForm;
