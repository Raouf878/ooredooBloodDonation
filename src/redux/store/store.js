import { configureStore } from "@reduxjs/toolkit";
import  credentials from '../slices/Credentials'
import Location from "../slices/Location";
export const store=configureStore({
    reducer:{
        credentials:credentials,
        Location:Location
    }
})