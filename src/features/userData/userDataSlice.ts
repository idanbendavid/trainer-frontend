import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import userDataService from './userDataService';

const initialState = {

}

export const getUserDetails = createAsyncThunk('user/getDetails', async () => {
    try {
        return await userDataService.getUserDetails()
    }
    catch (error: any) {
        const message: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return message
    }
})

export const changeUserEmail = createAsyncThunk('user/changeEmail', async (newUserEmail: string, thunkAPI) => {
    try {
        return await userDataService.changeEmail(newUserEmail)
    }
    catch (error: any) {
        const message: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const changeUserPassword = createAsyncThunk('user/changePassword', async (newUserPassword: string, thunkAPI) => {
    try {
        return await userDataService.changePassword(newUserPassword)
    }
    catch (error: any) {
        const message: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changeUserEmail.fulfilled, (state, action: PayloadAction<string>) => {
                // state.connectedUser.email = action.payload;
                // state.message = "email changed successfully";
            })
            .addCase(changeUserEmail.rejected, (state, action: PayloadAction<any>) => {
                // state.message = action.payload
            })
            // -----------------------------------------------------------------------------------
            .addCase(changeUserPassword.fulfilled, (state, action: PayloadAction<string>) => {
                // state.connectedUser.password = action.payload;
                // state.message = "password changed successfully";
            })
            .addCase(changeUserPassword.rejected, (state, action: PayloadAction<any>) => {
                // state.message = action.payload
            })
    }
})

export default userDataSlice.reducer