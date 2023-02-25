import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nickname: "",
    id:"",
    scenarioId:"",
    scenarioStartTime:Date.now()
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (state, action) => {
      state.nickname = action.payload;
    },
    updateUserID: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { initUser, updateUserID } = userSlice.actions;

export default userSlice.reducer;