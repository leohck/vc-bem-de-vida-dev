import { combineReducers } from "@reduxjs/toolkit";
import wish from "./wishSlice";
import goal from "./goalSlice";
import actionPlan from "./actionPlanSlice";
import action from "./actionSlice"

const reducer = combineReducers({
	wishSlice: wish,
	goalSlice: goal,
	actionPlanSlice: actionPlan,
	actionSlice: action
});

export default reducer;