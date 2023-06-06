import { combineReducers } from '@reduxjs/toolkit'
import userInfo from './userInfoSlice'
import skills from './skillsSlice'
import routine_payment from './routinePaymentSlice'
import routine_action from './routineActionSlice'

const reducer = combineReducers({
    userInfoState: userInfo,
    userSkillState: skills,
    routinePaymentSlice: routine_payment,
    routineActionSlice: routine_action
})

export default reducer;