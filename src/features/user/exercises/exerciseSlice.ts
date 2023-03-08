import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IUserExerciseDetails } from '../../../models/IUserExerciseDetails';
import userDataService from '../../../services/userDataService';

const initialState = {
    userExercises: [] as IUserExerciseDetails[],
    message: ''

}

export const getExerciseOfUser = createAsyncThunk('usersExercises/exercisesOfUser', async (thunkAPI) => {
    try {
        const response = await userDataService.getExerciseOfUser()
        if (response) {
            return response
        }
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        console.log(message)
        toast.error(message)
    }
})

export const saveUserExerciseDetails = createAsyncThunk('usersExercises/addExercise', async (userExerciseDetails: IUserExerciseDetails, thunkAPI) => {
    try {
        const response = await userDataService.saveUserExerciseDetails(userExerciseDetails)
        if (response) {
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
        resetUserExercise: (state) => {state.userExercises = initialState.userExercises},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExerciseOfUser.fulfilled, (state, action: PayloadAction<IUserExerciseDetails[]>) => {
                state.userExercises = action.payload;
            })
            .addCase(getExerciseOfUser.rejected, (state, action: PayloadAction<unknown>) => {
                    // state.message = ''
            })
            //-----------------------------------------------------------------
            .addCase(saveUserExerciseDetails.fulfilled, (state, action: PayloadAction<{}>) => {
                if (action.payload) {
                    toast.info('successfuly saved')
                }
            })
            .addCase(saveUserExerciseDetails.rejected, (state, action: PayloadAction<{}>) => {
                    
            })
    }
})

export const { resetUserExercise } = exerciseSlice.actions
export default exerciseSlice.reducer
