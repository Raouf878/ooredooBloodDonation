import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../../FirebaseConfig';
import { doc,getDoc } from 'firebase/firestore';

const initialState={
    useriddd:null,
    FirstName:null,
    LastName:null,
    PhoneNumber:null,
    BloodType:null,
    loadingStates: [false, false, false],

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
        },
        setLoadingState: (state, action) => {
            state.loadingStates[action.payload.index] = action.payload.loadingState;
          },
    },
})
export const {setFirstName,setLastName,setPhoneNumber,setBloodType,setUser,setUserLoading,setUserid,setLoadingState}=CredSlice.actions;
export const selectedBloodType=(state)=>state.credentials.BloodType;
export const selectedFirstName=(state)=>state.credentials.FirstName;
export const selectedLastName=(state)=>state.credentials.LastName;
export const selectedPhoneNumber=(state)=>state.credentials.PhoneNumber;
export const selectUserId=(state)=>state.credentials.useriddd;
export const selectUserLoading=(state)=>state.credentials.userLoading;
export const selectLoadingStates = (state) => state.credentials.loadingStates;
export const listenForUserData = async (userId) => {
    
    const docRef = doc(db, 'UsersData', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
     
      return docSnap.data()
      
    } else {
      return null;
    }
  };


export default CredSlice.reducer