import { combineReducers } from '@reduxjs/toolkit'
import userInfo from './userInfoSlice'
import skills from './skillsSlice'
import routine_payment from './routinePaymentSlice'
import routine_action from './routineActionSlice'
import source_income from './sourceIncomeSlice'

const reducer = combineReducers({
    userInfoState: userInfo,
    userSkillState: skills,
    routinePaymentSlice: routine_payment,
    routineActionSlice: routine_action,
    sourceIncomeSlice: source_income
})

export default reducer;