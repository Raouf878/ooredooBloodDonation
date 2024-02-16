import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../../FirebaseConfig';
import { doc,getDoc } from 'firebase/firestore';

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
export const selectUserLoading=(state)=>state.credentials.userLoading;
export const listenForUserData = async (userId) => {
    const docRef = doc(db, 'UsersData', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data(); // Return user data if document exists
    } else {
      return null; // Return null if document does not exist
    }
  };


export default CredSlice.reducer