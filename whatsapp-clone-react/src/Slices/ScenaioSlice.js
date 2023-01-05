import {createSlice} from "@reduxjs/toolkit";

const severity = {
    HARSH:0,
    MILD:0
}

const commentStyle = {
    PRO: 0,
    AGAINST: 1,
    NO_COMMENT: 2
}

const initialState = {
    id: "",
    severity: severity.HARSH,
    commentStyle: commentStyle.PRO,
    numberOfUsers: 5,
    messages: []
}


export const ScenarioSlice = createSlice({
    name: 'scenario',
    initialState,
    reducers: {
        initScenario: (state, action) => {
            state.id = action.payload;
        },
    }
});

export const {initScenario} = ScenarioSlice.actions;

export default ScenarioSlice.reducer;