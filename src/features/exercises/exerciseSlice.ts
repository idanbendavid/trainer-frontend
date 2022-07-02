import { createSlice } from '@reduxjs/toolkit'
import { IExercise } from '../../models/IExercise';

const initialState = {
    exercises: [] as any,
    bodyParts: [] as string[],
    exercise: {} as IExercise,
    bodyPart: ""
}



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
    }
})


export const { reset, getBodyPartsList, passBodyPartName, displayExercisesByBodyPartName } = exerciseSlice.actions
export default exerciseSlice.reducer