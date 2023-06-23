import { combineReducers } from 'redux'
import theme from './theme/themeSlice'
import auth from './auth'
import base from './base'
import userinfo from './userinfo'
import module3 from "./module3";
import locale from './locale/localeSlice'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        base,
        locale,
        userinfo,
        module3,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}

export default rootReducer
