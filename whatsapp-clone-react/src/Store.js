import userReducer from './Slices/UserSlice'
import scenarioReducer from './Slices/ScenaioSlice'
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        user: userReducer,
        scenario: scenarioReducer
    },
});