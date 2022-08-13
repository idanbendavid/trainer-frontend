import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { IExercise } from '../../models/IExercise';
import exerciseService from '../../services/exercisesService';

const initialState = {
    exercises: [] as any,
    bodyParts: [] as string[],
    exercise: {} as IExercise,
    bodyPart: "",
    userExercises: [] 
}


export const addExerciseToUserSchedule = createAsyncThunk('exercise/addToSchedule', async (data: {}, thunkAPI) => {
    try {
        const response = await exerciseService.addExerciseToUserSchedule(data)
        return response
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const getExercisesOfUser = createAsyncThunk('exercise/getUserExercises', async () => {
    try {
        const response = await exerciseService.getExercisesOfUser()
        return response
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message)
        return message
    }
})

export const exerciseSlice = createSlice({
    name: "exercise",
    initialState,
    reducers: {
        reset: (state) => state = initialState,
        getBodyPartsList: (state, action) => { state.bodyParts = action.payload },
        passBodyPartName: (state, action) => { state.bodyPart = action.payload },
        displayExercisesByBodyPartName: (state, action) => { state.exercises = action.payload }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addExerciseToUserSchedule.fulfilled, (state, action) => {
                console.log(action)
            })
            .addCase(addExerciseToUserSchedule.rejected, (state, action) => {
                console.log(action)
            })
            // -------------------------------------------------------------------------
            .addCase(getExercisesOfUser.fulfilled, (state, action) => {
                state.userExercises = action.payload
            })
    }
})


export const { reset, getBodyPartsList, passBodyPartName, displayExercisesByBodyPartName } = exerciseSlice.actions
export default exerciseSlice.reducer