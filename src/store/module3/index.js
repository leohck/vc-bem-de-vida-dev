import { combineReducers } from '@reduxjs/toolkit'
import wish from "./wishSlice";
import goal from "./goalSlice";

const reducer = combineReducers({
	wishSlice: wish,
	goalSlice: goal
})

export default reducer