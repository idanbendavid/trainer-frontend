import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { IExercise } from '../../models/IExercise';
import exerciseService from '../../services/exercisesService';

const initialState = {
    exercises: [] as any,
    bodyParts: [] as string[],
    exercise: {} as IExercise,
    bodyPart: "",
    userExercises: [],
    amountOfExercises: []
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

export const deleteExerciseOfUser = createAsyncThunk('exercise/deleteExerciseOfUser', async (exerciseId: number) => {
    try {
        const response = await exerciseService.deleteExerciseOfUser(exerciseId)

        return response
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message)
        return message
    }
})

export const getAmountOfExercises = createAsyncThunk('exercise/amountOfExercises', async () => {
    try {
        const response = await exerciseService.getAmountOfExercisesPerDateForUser()

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
                // console.log(action)
            })
            .addCase(addExerciseToUserSchedule.rejected, (state, action) => {
                // console.log(action)
            })
            // -------------------------------------------------------------------------
            .addCase(getExercisesOfUser.fulfilled, (state, action) => {
                state.userExercises = action.payload;

                for (let index = 0; index < state.userExercises.length; index++) {
                    if (state.userExercises[index].exercise_status === 0) {
                        state.userExercises[index].exercise_status = false
                    }
                    else {
                        state.userExercises[index].exercise_status = true
                    }
                }

                // sorting the array by exercise date that his type is string
                state.userExercises.sort(function (a, b) {
                    a = a.exerciseDate.split('-').reverse().join('');
                    b = b.exerciseDate.split('-').reverse().join('');
                    return a > b ? 1 : a < b ? -1 : 0
                })
            })
            // ------------------------------------------------------
            .addCase(getAmountOfExercises.fulfilled, (state,action)=>{
                state.amountOfExercises = action.payload;
            })
    }
})


export const { reset, getBodyPartsList, passBodyPartName, displayExercisesByBodyPartName } = exerciseSlice.actions
export default exerciseSlice.reducer