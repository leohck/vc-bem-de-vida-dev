import { useActionDeadlineList } from "./useActionDeadlineList";

export const useActionDeadlineValue = (actionPlanID, actionID) => {
	const { action_deadlines } = useActionDeadlineList(actionPlanID);
	
	return action_deadlines.filter(
		item => item.action === actionID
	);
};