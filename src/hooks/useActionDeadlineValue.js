import { useActionDeadlineList } from "./useActionDeadlineList";
import { useEffect } from "react";

export const useActionDeadlineValue = (actionPlanID, actionID) => {
	const { action_deadlines, refreshActionDeadlineList } = useActionDeadlineList(actionPlanID);
	let deadlines = []
	
	const refreshDeadLines = () => {
		refreshActionDeadlineList();
		deadlines = action_deadlines.filter(
			item => item.action === actionID
		)
	}
	useEffect(() => {
		refreshDeadLines()
	}, [])
	
	return {
		deadlines: deadlines,
		refreshDeadLines
	}
};