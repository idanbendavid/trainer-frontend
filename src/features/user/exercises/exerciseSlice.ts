import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IUserExerciseDetails } from '../../../models/IUserExerciseDetails';
import userDataService from '../../../services/userDataService';

const initialState = {}

export const saveUserExerciseDetails = createAsyncThunk('TEMP', async (userExerciseDetails: IUserExerciseDetails, thunkAPI)  => {
    try {
        const response = await userDataService.saveUserExerciseDetails(userExerciseDetails)
        if(response){
            return response
        }
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message)
    }
})

export const exerciseSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => state = initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(saveUserExerciseDetails.fulfilled,(state, action:PayloadAction<unknown>) =>{

        })
        .addCase(saveUserExerciseDetails.pending,(state, action:PayloadAction<unknown>) =>{

        })
        .addCase(saveUserExerciseDetails.rejected,(state, action:PayloadAction<unknown>) =>{

        })
    }
})

export const { reset } = exerciseSlice.actions
export default exerciseSlice.reducer
