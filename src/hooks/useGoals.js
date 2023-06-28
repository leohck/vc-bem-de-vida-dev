import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {fetchGoals} from "../store/module3/goalSlice"
import { useUserID } from "./useUserID";

export const useGoals = () => {
    const dispatch = useDispatch();
    const goalSlice = useSelector(state => state.module3.goalSlice);
    const {userID} = useUserID();
    useEffect(() => {
        dispatch(fetchGoals({ user_id: userID }));
    }, []);

    return {goals: goalSlice.goals}
};
