import { configureStore } from "@reduxjs/toolkit";
import  credentials from '../slices/Credentials'
export const store=configureStore({
    reducer:{
        credentials:credentials,
    }
})