import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { LoginDetails } from '../../../models/User'
import { IUser } from '../../../models/User'
import { UserRole } from '../../../models/role'
import authService from '../../../services/authService'
import userDataService from '../../../services/userDataService'


const initialState = {
    message: "",
    isLoggedIn: false,
    isError: false,
    isSuccess: false,
    connectedUser: {
        id: 0,
        firstName: "Guest",
        lastName: "",
        email: "",
        password: "" || undefined,
        birthDate: "",
        userRole: UserRole.Visitor,
        token: ""
    } as IUser,
}

export const register = createAsyncThunk('auth/register', async (registeredUser: IUser, thunkAPI) => {
    try {
        return await authService.register(registeredUser)
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (loggedInDetails: LoginDetails, thunkAPI) => {
    try {
        return await authService.login(loggedInDetails)
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message);
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', () => {
    try {
        return authService.logout()
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message)
        return message;
    }
})

export const remainConnceted = createAsyncThunk('auth/surviveRefresh', async (thunkAPI) => {
    try {
        return await authService.surviveRefresh()
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message)
        return message
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

export const changeUserPassword = (async (newPassword: string, email: string) => {
    try {
        const response = await userDataService.changePassword(newPassword, email)
        if (response) {
            toast.info("password changed successfuly")
            return response
        }
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        toast.error(message)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetUserData: (state) => state = initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoggedIn = true;
                state.isSuccess = true;
                state.message = "thanks for registaring to our service";
                state.connectedUser = {
                    id: action.payload.id,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    birthDate: action.payload.birthDate,
                    userRole: action.payload.userRole,
                    token: action.payload.token
                }
            })
            .addCase(register.rejected, (state, action: PayloadAction<any>) => {
                state.isError = true;
                state.isLoggedIn = false;
                state.isSuccess = false;
                state.connectedUser = initialState.connectedUser;
                state.message = action.payload;
            })
            // ---------------------------------------------------------------------
            .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoggedIn = true;
                state.isSuccess = true;
                state.isError = false;
                state.connectedUser = {
                    id: action.payload.id,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    birthDate: action.payload.birthDate,
                    userRole: action.payload.userRole,
                    token: action.payload.token
                }
                state.message = "successful login";
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.connectedUser = initialState.connectedUser;
                state.message = action.payload;
                state.isError = true;
                state.isLoggedIn = false;
                state.isSuccess = false;
            })
            // ----------------------------------------------------------------------
            .addCase(logout.fulfilled, (state) => {
                state.message = "goodbye"
                state.isError = false
                state.isLoggedIn = false
                state.isSuccess = false
                state.connectedUser = initialState.connectedUser;

            })
            // ----------------------------------------------------------------------
            .addCase(remainConnceted.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoggedIn = true;
                state.connectedUser = action.payload.data
                if(!state.connectedUser.token){
                    state.connectedUser.token = localStorage.getItem("token");
                }
                state.isError = false
                state.isSuccess = true
                state.message = "connected"
            })
            .addCase(remainConnceted.rejected, (state, action: PayloadAction<any>) => {
                state.isLoggedIn = false;
                state.connectedUser = initialState.connectedUser;
                state.isError = true
                state.isSuccess = false
                state.message = "not connected"
            })
            // -----------------------------------------------------------------------------------
            .addCase(checkEmailBeforePasswordChange.fulfilled, (state, action: PayloadAction<string>) => {
                state.connectedUser.email = action.payload
            })
            // -----------------------------------------------------------------------------
            .addCase(checkEmailBeforePasswordChange.rejected, (state, action: PayloadAction<any>) => {
                state.message = action.payload
            })
    }
})

export const { resetUserData } = authSlice.actions
export default authSlice.reducer
