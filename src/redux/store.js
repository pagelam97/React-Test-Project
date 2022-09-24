import { createStore, combineReducers } from 'redux'

import  sideMenuCollapsedReducer  from './reducer/sideMenuCollapsedReducer'
import lodaingStateReducer from './reducer/lodaingStateReducer'

const reducer = combineReducers({
    sideMenuCollapsedReducer: sideMenuCollapsedReducer,
    lodaingStateReducer: lodaingStateReducer
})



const store = createStore(reducer)

export default store