import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../../FirebaseConfig';


const initialState={
   userLat:null,
   UserLon:null,

}
export const LocSlice=createSlice({
    name:'Location',
    initialState,
    reducers:{
        setUserLat:(state,action)=>{
            state.userLat=action.payload
        },
        setUserLon:(state,action)=>{
            state.UserLon=action.payload
        }
    }

})
export const{setUserLat,setUserLon}=LocSlice.actions
export const getUserLat=(state)=>state.Location.userLat
export const getUserLon=(state)=>state.Location.UserLon

export default LocSlice.reducer