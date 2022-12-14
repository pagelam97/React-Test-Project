const sideMenuCollapsedReducer = (preState = { isCollapsed: false }, action = {}) => {


    switch (action.type) {
        case 'change-Collapsed': {
            return {
                ...preState,
                isCollapsed: !preState.isCollapsed
            }
        }

        default: return preState
    }

}
export default sideMenuCollapsedReducer