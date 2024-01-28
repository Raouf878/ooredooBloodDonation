import { createSlice } from "@reduxjs/toolkit";

const initialState={
    FirstName:null,
    LastName:null,
    PhoneNumber:null,
    BloodType:null,

}
export const CredSlice = createSlice({
    name:'credentials',
    initialState,
    reducer:{
        setFirstName:(state,action)=>{
            state.origin=action.payload;
        },
        setLastName:(state,action)=>{
            state.origin=action.payload;
        },
        setPhoneNumber:(state,action)=>{
            state.origin=action.payload;
        },
        setBloodType:(state,action)=>{
            state.origin=action.payload;
        }
    }
})
export const {setFirstName,setLastName,setPhoneNumber,setBloodType}=CredSlice.actions;
export const selectedBloodType=(state)=>state.credentials.BloodType;
export const selectedFirstName=(state)=>state.credentials.FirstName;
export const selectedLastName=(state)=>state.credentials.LastName;
export const selectedPhoneNumber=(state)=>state.credentials.PhoneNumber;