import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    text:"",
    timeOffset:Date.now(),
    user:""
}


export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        initMessage: (state, action) => {
            state.text = action.payload;
        },
    }
});

export const {initMessage} = messageSlice.actions;

export default messageSlice.reducer;