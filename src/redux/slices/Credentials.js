import { createSlice } from '@reduxjs/toolkit';


const initialState={
    useriddd:null,
    FirstName:null,
    LastName:null,
    PhoneNumber:null,
    BloodType:null,
    userLoading:false,

}
export const CredSlice = createSlice({
    name:'credentials',
    initialState,
    reducers:{
        
        setUserid:(state,action)=>{
            state.useriddd=action.payload;
        },
        setUserLoading:(state,action)=>{
            state.userLoading=action.payload;

        },
        setFirstName:(state,action)=>{
            state.FirstName=action.payload;
        },
        setLastName:(state,action)=>{
            state.LastName=action.payload;
        },
        setPhoneNumber:(state,action)=>{
            state.PhoneNumber=action.payload;
        },
        setBloodType:(state,action)=>{
            state.BloodType=action.payload;
        }
    },
})
export const {setFirstName,setLastName,setPhoneNumber,setBloodType,setUser,setUserLoading,setUserid}=CredSlice.actions;
export const selectedBloodType=(state)=>state.credentials.BloodType;
export const selectedFirstName=(state)=>state.credentials.FirstName;
export const selectedLastName=(state)=>state.credentials.LastName;
export const selectedPhoneNumber=(state)=>state.credentials.PhoneNumber;
export const selectUserId=(state)=>state.credentials.useriddd;

export default CredSlice.reducer