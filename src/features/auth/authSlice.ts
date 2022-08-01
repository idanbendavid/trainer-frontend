import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ILogin } from '../../models/ILogin'
import { IUser } from '../../models/IUser'
import { UserRole } from '../../models/role'
import authService from '../../services/authService'



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
        birthDate: new Date() || undefined,
        userRole: UserRole.Visitor,
    } as IUser,
    token: ""
}

export const register = createAsyncThunk('auth/register', async (registeredUser: IUser, thunkAPI) => {
    try {
        return await authService.register(registeredUser)
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (loggedInDetails: ILogin, thunkAPI) => {
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
        return message;
    }
})

export const remainConnceted = createAsyncThunk('auth/surviveRefresh', async (thunkAPI) => {
    try {
        return await authService.surviveRefresh()
    }
    catch (error: any) {
        const message: string = error.response.data.error;
        return message
    }
})


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
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
                    userRole: UserRole.Visitor,
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
                    userRole: UserRole.Visitor,
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
                    userRole: UserRole.Visitor,
                            } as IUser;
                state.token = "";
            })
            // ----------------------------------------------------------------------
            .addCase(remainConnceted.fulfilled, (state, action: PayloadAction<any>) => {
                console.log(action.payload)
                state.isLoggedIn = true;
                state.connectedUser = action.payload.data
                state.isError = false
                state.isSuccess = true
                state.message = "connected"
                state.token = action.payload.config.headers.Authorization
            })
            .addCase(remainConnceted.rejected, (state, action: PayloadAction<any>) => {
                console.log(action.payload)
                state.isLoggedIn = false;
                state.connectedUser = {} as IUser
                state.isError = true
                state.isSuccess = false
                state.message = "not connected"
                state.token = ""
            })
            
    }
})

export default authSlice.reducer
