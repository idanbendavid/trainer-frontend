import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { IUser } from '../../models/IUser';
import { UserRole } from '../../models/role';
import userDataService from '../../services/userDataService';

const initialState = {
    message: "",
    user: {
        userId: 0,
        firstName: '',
        lastName: '',
        email: '',
        userRole: UserRole.Visitor,
        token: ''
    } as IUser
}

export const getUserDetails = createAsyncThunk('user/getDetails', async () => {
    try {
        const response = await userDataService.getUserDetails();
        return response
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message)
        return message
    }
})

export const changeUserEmail = createAsyncThunk('user/changeEmail', async (newUserEmail: string, thunkAPI) => {
    try {
        const response = await userDataService.changeEmail(newUserEmail)
        return response
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const checkEmailBeforePasswordChange = createAsyncThunk('user/checkEmail', async (checkEmail: string, thunkAPI) => {
    try {
        const response = await userDataService.checkEmail(checkEmail);
        return response
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const changeUserPassword = (async (newPassword: string, email: string ) => {
    try {
        const response = await userDataService.changePassword(newPassword, email)
        if(response){
            toast.info("password changed successfuly")
            return response
        }
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message)
    }
})

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        resetUserData: (state) => state = initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(changeUserEmail.fulfilled, (state, action: PayloadAction<string>) => {
                // state.connectedUser.email = action.payload;
                // state.message = "email changed successfully";
            })
            .addCase(changeUserEmail.rejected, (state, action: PayloadAction<any>) => {
                state.message = action.payload
            })
            // -----------------------------------------------------------------------------------
            .addCase(checkEmailBeforePasswordChange.fulfilled, (state, action: PayloadAction<string>) => {
                state.user.email = action.payload
            })
            // -----------------------------------------------------------------------------
            .addCase(checkEmailBeforePasswordChange.rejected, (state, action: PayloadAction<any>) => {
                state.message = action.payload
            })
        // -----------------------------------------------------------------------------
    }
})

export const { resetUserData } = userDataSlice.actions
export default userDataSlice.reducer