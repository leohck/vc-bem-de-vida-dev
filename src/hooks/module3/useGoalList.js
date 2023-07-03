import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGoals } from "../../store/module3/goalSlice";
import { useUserID } from "../useUserID";

export const useGoalList = () => {
	const dispatch = useDispatch();
	const goalsSlice = useSelector(state => state.module3.goalSlice);
	
	const { userID } = useUserID();
	
	const refreshGoalList = () => {
		dispatch(fetchGoals({ user_id: userID }));
	};
	
	useEffect(() => {
		refreshGoalList();
	}, [userID]);
	
	return {
		goals: goalsSlice.goals,
		refreshGoalList
	};
};