import { combineReducers } from "@reduxjs/toolkit";
import wish from "./wishSlice";
import goal from "./goalSlice";
import actionPlan from "./actionPlanSlice";
import action from "./actionSlice";
import actionDeadline from "./actionDeadlineSlice";

const reducer = combineReducers({
	wishSlice: wish,
	goalSlice: goal,
	actionPlanSlice: actionPlan,
	actionSlice: action,
	actionDeadlineSlice: actionDeadline
});

export default reducer;