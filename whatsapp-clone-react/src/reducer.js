export const initialState = {
    user:null,
    scenario:null,
};

export const actionTypes = {
    SET_USER : "SET_USER",
    SET_SCENARIO:"SET_SCENARIO"
};

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            };
        case actionTypes.SET_SCENARIO:
            return {
                ...state,
                scenario: action.scenario
            };
        default:
            return state;
    }
};

export default reducer;