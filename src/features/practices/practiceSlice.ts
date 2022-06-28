import { createSlice } from '@reduxjs/toolkit'
import { IPractice } from '../../models/IPractice';
// import practicesService from './practicesService';

const initialState = {
    practices: [] as any,
    practice: {} as IPractice
}



export const practiceSlice = createSlice({
    name: "practice",
    initialState,
    reducers: {
        reset: (state) => state = initialState,
        getPractices: (state, action) => { state.practices = action.payload }
    },
    extraReducers: (builder) => {
    }
})


export const { reset, getPractices } = practiceSlice.actions
export default practiceSlice.reducer