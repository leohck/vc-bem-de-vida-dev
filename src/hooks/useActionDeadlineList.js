import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchActionDeadlines } from "../store/module3/actionDeadlineSlice";

export const useActionDeadlineList = (actionPlanID) => {
	const dispatch = useDispatch();
	const actionDeadlineSlice = useSelector(state => state.module3.actionDeadlineSlice);
	const refreshActionDeadlineList = () => {
		dispatch(fetchActionDeadlines({ action_plan_id: actionPlanID }));
	};
	useEffect(() => {
		refreshActionDeadlineList();
	}, []);
	return {
		action_deadlines: actionDeadlineSlice.action_deadlines,
		refreshActionDeadlineList
	};
};