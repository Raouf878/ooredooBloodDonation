import { createAsyncThunk } from '@reduxjs/toolkit';
import { listenForUserData, setBloodType, setLastName, setPhoneNumber } from '../slices/Credentials';
import{setUserLoading} from '../slices/Credentials'
import { setFirstName } from '../slices/Credentials';



export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId, { dispatch }) => {
    dispatch(setUserLoading(true));

    const userData = await listenForUserData(userId);
    const {FirstName,bloodType,LastName,PhoneNumber}=userData
    
   
    dispatch(setFirstName(FirstName));
    dispatch(setBloodType(bloodType))
    dispatch(setLastName(LastName))
    dispatch(setPhoneNumber(PhoneNumber))
    dispatch(setUserLoading(false));

    console.log('Myyyyyyyyyyyyyy FirstNaem    ',FirstName);
  }
);