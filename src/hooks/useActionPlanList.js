import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchActionPlans } from "../store/module3/actionPlanSlice";

export const useActionPlanList = (goalID) => {
	const dispatch = useDispatch();
	const actionPlanSlice = useSelector(state => state.module3.actionPlanSlice);
	
	const refreshActionPlanList = () => {
		dispatch(fetchActionPlans({ goal_id: goalID }));
	};
	
	useEffect(() => {
		refreshActionPlanList()
	}, []);
	
	return {
		action_plans: actionPlanSlice.action_plans,
		refreshActionPlanList
	};
};