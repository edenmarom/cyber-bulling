import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nickname: "",
    id:"",
    scenarioId:"",
    scenarioStartTime:Date.now()
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // New user.
        initUser: (state, action) => {
            console.log(action.payload);
            state.nickname = action.payload;
        },
    }
});

export const { initUser } = userSlice.actions;

export default userSlice.reducer;