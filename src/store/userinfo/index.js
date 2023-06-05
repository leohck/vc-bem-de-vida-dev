import { combineReducers } from '@reduxjs/toolkit'
import userInfo from './userInfoSlice'
import skills from './skillsSlice'
import routine_payment from './routinePaymentSlice'

const reducer = combineReducers({
    userInfoState: userInfo,
    userSkillsState: skills,
    routinePaymentSlice: routine_payment,
})

export default reducer;