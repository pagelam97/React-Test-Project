import { createStore, combineReducers } from 'redux'

import  sideMenuCollapsedReducer  from './reducer/sideMenuCollapsedReducer'

const reducer = combineReducers({
    sideMenuCollapsedReducer: sideMenuCollapsedReducer
})



const store = createStore(reducer)

export default store