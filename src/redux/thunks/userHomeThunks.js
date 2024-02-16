import { createAsyncThunk } from '@reduxjs/toolkit';
import { listenForUserData } from '../slices/Credentials';
import{setUserLoading} from '../slices/Credentials'
import { setFirstName } from '../slices/Credentials';



export const fetchUserData = createAsyncThunk(
  'user/fetchUserData', // Action type
  async (userId, { dispatch }) => {
    dispatch(setUserLoading(true));

    const userData = await listenForUserData(userId);
    const {FirstName}=userData

   
    dispatch(setFirstName(FirstName));

    // Dispatch actions to indicate fetching completed
    dispatch(setUserLoading(false));
  }
);