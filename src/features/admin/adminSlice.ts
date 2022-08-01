import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import adminService from '../../services/adminService'

const initialState = {
    message: "",
    isAdminLoggedIn: false,
    isError: false,
    isSuccess: false,
}


export const deleteUser = createAsyncThunk("users/delete", async (userToDelete: number, thunkAPI) => {
    try {
        const response = adminService.deleteUser(userToDelete);
        return response;
    }
    catch (error) {
        const message: string = error.response.data.error;
        return thunkAPI.rejectWithValue(message)
    }
})



export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        reset: (state) => state = initialState,
        // ---------------------------------------------------------------
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<any>): void => {
                state.isAdminLoggedIn = true;
                state.isSuccess = true;
                state.message = "user deleted"
            })
            .addCase(deleteUser.rejected, (state, action: PayloadAction<string | {} | undefined>) => {
                state.isAdminLoggedIn = true
                state.isError = true;
                state.isSuccess = false
                state.message = "can't delete user"
            })
    }
})

export default adminSlice.reducer