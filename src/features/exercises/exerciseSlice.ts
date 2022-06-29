import { createSlice } from '@reduxjs/toolkit'
import { IExercise } from '../../models/IExercise';

const initialState = {
    exercises: [] as any,
    exercise: {} as IExercise
}



export const exerciseSlice = createSlice({
    name: "exercise",
    initialState,
    reducers: {
        reset: (state) => state = initialState,
        getExercises: (state, action) => { state.exercises = action.payload }
    },
    extraReducers: (builder) => {
    }
})


export const { reset, getExercises } = exerciseSlice.actions
export default exerciseSlice.reducer