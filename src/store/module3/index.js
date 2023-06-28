import { combineReducers } from "@reduxjs/toolkit";
import wish from "./wishSlice";
import goal from "./goalSlice";
import actionPlan from "./actionPlanSlice";

const reducer = combineReducers({
	wishSlice: wish,
	goalSlice: goal,
	actionPlanSlice: actionPlan
});

export default reducer;