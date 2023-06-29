import { useRoutineActionList } from "./useRoutineActionList";

export const useRoutineActionByPlanList = (actionPlanID) => {
	const { routine_actions, refreshRoutineActions } = useRoutineActionList();
	const actions = routine_actions.filter(
		item => item.action_plan.includes(actionPlanID)
	);
	return { routine_actions: actions, refreshRoutineActions };
};