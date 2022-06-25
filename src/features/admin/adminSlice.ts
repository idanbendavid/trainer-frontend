import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import adminService from './adminService'

const initialState = {
    message: "",
    isAdminLoggedIn: false,
    isError: false,
    isSuccess: false,
}


export const deleteUser = createAsyncThunk("users/delete", async (userToDelete: number, thunkAPI) => {
    try {
        return adminService.deleteUser(userToDelete)
    }
    catch (error: any) {
        const message: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteCoach = function (userToDelete: number, coachId: string) {
    try {
        return adminService.deleteCoach(userToDelete, coachId)
    }
    catch (error: any) {
        const message: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return message
    }
}


export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        reset: (state) => state = initialState,
        // ---------------------------------------------------------------
        deleteCoach(state, action: PayloadAction<any>): void {
            console.log(action.payload)
            state.isAdminLoggedIn = true;
            state.isSuccess = true;
            state.message = "coach deleted"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<any>): void => {
                console.log(action.payload)
                state.isAdminLoggedIn = true;
                state.isSuccess = true;
                state.message = "user deleted"
            })
            .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
                console.log(action.payload)
                state.isAdminLoggedIn = true
                state.isError = true;
                state.isSuccess = false
                state.message = "can't delete user"
            })
    }
})

export default adminSlice.reducer