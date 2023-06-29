import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchActions } from "../store/module3/actionSlice";

export const useActionList = (actionPlanID) => {
	const dispatch = useDispatch();
	const actionSlice = useSelector(state => state.module3.actionSlice);
	const refreshActionList = () => {
		dispatch(fetchActions({ action_plan_id: actionPlanID }));
	};
	useEffect(() => {
		refreshActionList();
	}, []);
	
	return { actions: actionSlice.actions, refreshActionList };
};