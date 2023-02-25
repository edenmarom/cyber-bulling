import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scenario:{
        id:"",
        commentType: "",
        severity:"",
        numberOfUsers: 0,
        messages: []
    }
}

export const scenarioSlice = createSlice({
    name: "scenario",
    initialState,
    reducers: {
        initScenario: (state, action) => {
            state.scenario = action.payload;
        },
    },
});

export const { initScenario } = scenarioSlice.actions;

export default scenarioSlice.reducer;