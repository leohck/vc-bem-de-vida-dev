import { combineReducers } from '@reduxjs/toolkit'
import wish from "./wishSlice";

const reducer = combineReducers({
	wishSlice: wish
})

export default reducer