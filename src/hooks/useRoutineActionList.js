import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRoutineActions } from "../store/userinfo/routineActionSlice";
import { useUserID } from "./useUserID";

export const useRoutineActionList = () => {
	const dispatch = useDispatch();
	const { userID } = useUserID();
	const routine_actions = useSelector(
		state => state.userinfo.routineActionSlice
	);
	const refreshRoutineActions = () => {
		dispatch(fetchRoutineActions({ user_id: userID }));
	}
	useEffect(() => {
		refreshRoutineActions()
	}, []);
	
	return {
		routine_actions: routine_actions.routine_actions,
		routine_actions_not_done: routine_actions.routine_actions.filter(
			(action) => action.status !== "concluido"
		),
		routine_actions_with_action_plan: routine_actions.routine_actions.filter(
			(action) => action.status !== "concluido" && action.action_plan.length >= 1
		),
		refreshRoutineActions
	}
};