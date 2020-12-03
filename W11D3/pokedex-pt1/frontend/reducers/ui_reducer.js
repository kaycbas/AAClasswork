
const uiReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case "yo":
            return state
        default:
            return state
    }
}

export default uiReducer;