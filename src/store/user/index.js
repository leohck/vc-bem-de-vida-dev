import { combineReducers } from '@reduxjs/toolkit'
import user from './userSlice'
import skills from './skillsSlice'

const reducer = combineReducers({
    user,
    skills,
})

export default reducer;