import { combineReducers } from '@reduxjs/toolkit'
import userInfo from './userInfoSlice'
import skills from './skillsSlice'
import achievement from './achievementSlice'
import routine_payment from './routinePaymentSlice'
import routine_action from './routineActionSlice'
import source_income from './sourceIncomeSlice'
import notification from './notificationSlice'

const reducer = combineReducers({
    userInfoState: userInfo,
    skillSlice: skills,
    achievementSlice: achievement,
    routinePaymentSlice: routine_payment,
    routineActionSlice: routine_action,
    sourceIncomeSlice: source_income,
    notificationSlice: notification
})

export default reducer
