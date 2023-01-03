import userReducer from './Slices/UserSlice'
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        user: userReducer
    },
});