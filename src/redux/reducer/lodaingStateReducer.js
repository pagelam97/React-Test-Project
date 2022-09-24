const lodaingStateReducer = (preState = { isLoading: false }, action = {}) => {

    switch (action.type) {
        case 'change-loadingState': {
            return {
                isLoading: action.playload
            }
        }

        default: return preState
    }
}
export default lodaingStateReducer