import isMobileReducer     from './isMobile'
import userLogin           from './userLogin' 
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    isMobile: isMobileReducer,
    user: userLogin,
})

export default allReducers