import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { LoginDetails } from '../../../models/LoginDetails'
import { IUser } from '../../../models/IUser'
import { UserRole } from '../../../models/role'
import authService from '../../../services/authService'
import userDataService from '../../../services/userDataService'


const initialState = {
    message: "",
    isLoggedIn: false,
    isError: false,
    isSuccess: false,
    connectedUser: {
        userId: 0,
        firstName: "Guest",
        lastName: "",
        email: "",
        password: "" || undefined,
        birthDate: "",
        userRole: UserRole.Athlete,
    } as IUser,
    token: ""
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
                    userId: action.payload.registerUser.insertId,
                    firstName: action.payload.newUser.firstName,
                    lastName: action.payload.newUser.lastName,
                    email: action.payload.newUser.email,
                    password: undefined,
                    birthDate: action.payload.newUser.birthDate,
                    userRole: action.payload.newUser.userRole,
                    registerUser: {},
                    newUser: {},
                    loginDetails: {},
                    token: ""
                }
                state.token = action.payload.token

            })
            .addCase(register.rejected, (state, action: PayloadAction<any>) => {
                state.isError = true;
                state.isLoggedIn = false;
                state.isSuccess = false;
                state.connectedUser = {
                    userId: 0,
                    firstName: "Guest",
                    lastName: "",
                    email: "",
                    password: "" || undefined,
                    birthDate: undefined,
                    userRole: UserRole.Athlete,
                            } as IUser;
                state.message = action.payload;
                state.token = "";
            })
            // ---------------------------------------------------------------------
            .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoggedIn = true;
                state.isSuccess = true;
                state.isError = false;
                state.connectedUser = action.payload.loginDetails;
                state.message = "successful login";
                state.token = action.payload.token
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.connectedUser = {
                    userId: 0,
                    firstName: "Guest",
                    lastName: "",
                    email: "",
                    password: "" || undefined,
                    birthDate: undefined,
                    userRole: UserRole.Athlete,
                            } as IUser;
                state.message = action.payload;
                state.isError = true;
                state.isLoggedIn = false;
                state.isSuccess = false;
                state.token = "";
            })
            // ----------------------------------------------------------------------
            .addCase(logout.fulfilled, (state) => {
                state.message = "goodbye"
                state.isError = false
                state.isLoggedIn = false
                state.isSuccess = false
                state.connectedUser = {
                    userId: 0,
                    firstName: "Guest",
                    lastName: "",
                    email: "",
                    password: "" || undefined,
                    birthDate: undefined,
                    userRole: UserRole.Athlete,
                            } as IUser;
                state.token = "";
            })
            // ----------------------------------------------------------------------
            .addCase(remainConnceted.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoggedIn = true;
                state.connectedUser = action.payload.data
                state.isError = false
                state.isSuccess = true
                state.message = "connected"
                state.token = action.payload.config.headers.Authorization
            })
            .addCase(remainConnceted.rejected, (state, action: PayloadAction<any>) => {
                state.isLoggedIn = false;
                state.connectedUser = {} as IUser
                state.isError = true
                state.isSuccess = false
                state.message = "not connected"
                state.token = ""
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
