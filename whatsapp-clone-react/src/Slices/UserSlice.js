import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // New user.
        initUser: (state, action) => {
            state.currentUser = action.payload;
        },
    }
});

export const { initUser } = userSlice.actions;

export default userSlice.reducer;