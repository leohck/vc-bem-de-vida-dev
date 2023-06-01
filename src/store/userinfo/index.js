import { combineReducers } from '@reduxjs/toolkit'
import userInfo from './userInfoSlice'
import skills from './skillsSlice'

const reducer = combineReducers({
    userInfoState: userInfo,
    userSkillsState: skills,
})

export default reducer;