import { configureStore } from "@reduxjs/toolkit";
import CredReducer from '../slices/Credentials'
export const store=configureStore({
    reducer:{
        credentials:CredReducer,
    }
})