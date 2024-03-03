import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../../FirebaseConfig';


const initialState={
   userLat:null,
   UserLon:null,
   userSearchLat:null,
   userSearchLon:null,

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
        },
        setUserSearchLat:(state,action)=>{
            void(state.userSearchLat=action.payload)

        },
        setUserSearchLon:(state,action)=>
        void(state.userSearchLon=action.payload)
    }

})
export const{setUserLat,setUserLon,setUserSearchLat,setUserSearchLon}=LocSlice.actions
export const getUserLat=(state)=>state.Location.userLat
export const getUserLon=(state)=>state.Location.UserLon
export const getUserSrachLat=(state)=>state.Location.userSearchLat
export const getUserSearchLon=(state)=>state.Location.userSearchLon

export default LocSlice.reducer