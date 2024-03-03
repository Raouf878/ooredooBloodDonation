import { createAsyncThunk } from '@reduxjs/toolkit';
import { listenForUserData } from '../slices/Credentials';
import{setUserLoading} from '../slices/Credentials'
import { setFirstName } from '../slices/Credentials';



export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId, { dispatch }) => {
    dispatch(setUserLoading(true));

    const userData = await listenForUserData(userId);
    const {FirstName}=userData

   
    dispatch(setFirstName(FirstName));
    dispatch(setUserLoading(false));

    console.log('Myyyyyyyyyyyyyy FirstNaem    ',FirstName);
  }
);