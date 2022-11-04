import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { IComplaint } from '../../models/IComplaint';
import adminService from '../../services/adminService'
import publicComplatinsService from '../../services/publicComplaintsService';

const initialState = {
    message: "",
    isAdminLoggedIn: false,
    isError: false,
    isSuccess: false,
    complaint: {
        complaintId: 0,
        firstName: "",
        lastName: "",
        email: "",
        complaintCategory: "",
        description: "",
        complaintDate: ""
    } as IComplaint,
    publicComplaints: [] as IComplaint[],
    adminTasks: []
}


export const deleteUser = createAsyncThunk("users/delete", async (userToDelete: number, thunkAPI) => {
    try {
        const response = await adminService.deleteUser(userToDelete);
        return response;
    }
    catch (error) {
        const message: string = error.response.data.error;
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllComplaints = createAsyncThunk("admin/getComplaints", async () => {
    try {
        const response = await publicComplatinsService.getAllComplaints();
        return response;
    }
    catch (error) {
        const message: string = error.response.data.error;
        return message
    }
})

export const deleteUserComplaint = createAsyncThunk("admin/deleteComplaint", async (complaintId: number, thunkAPI) => {
    try {
        const response = await publicComplatinsService.deleteComplaint(complaintId);
        return response;
    }
    catch (error) {
        const message: string = error.response.data.error;
        toast.info(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAdminTasks = createAsyncThunk("admin/getAdminTasks", async () => {
    try {
        const response = await adminService.getAdminTasks();
        return response;
    }
    catch (error) {
        const message: string = error.response.data.error;
        toast.info(message)
        return message;
    }
})

export const newAdminTasks = createAsyncThunk("admin/newAdminTasks", async (newTask: string, thunkAPI) => {
    try {
        const response = await adminService.addNewTask(newTask);
        return response;
    }
    catch (error) {
        const message: string = error.response.data.error;
        toast.info(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteTask = createAsyncThunk("admin/deleteAminTasks", async (task: string, thunkAPI) => {
    try {
        const response = await adminService.deleteTask(task);
        return response;
    }
    catch (error) {
        const message: string = error.response.data.error;
        toast.info(message)
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
            // --------------------------------------------------------------
            .addCase(getAllComplaints.fulfilled, (state, action: PayloadAction<IComplaint[]>) => {
                state.publicComplaints = action.payload

                state.publicComplaints.sort(function (a, b) {
                    return a.complaintCategory.toLocaleLowerCase() > b.complaintCategory.toLocaleLowerCase()
                        ? 1 : a.complaintCategory.toLocaleLowerCase() < b.complaintCategory.toLocaleLowerCase() ? -1 : 0
                })
            })
            .addCase(getAllComplaints.rejected, (state, action: PayloadAction<{}>) => {
                state.message = "could not get all user complaints please check passed data"
            })
            // ------------------------------------------------------------------------------------
            .addCase(deleteUserComplaint.fulfilled, (state, action: PayloadAction<number>) => {
                state.publicComplaints = state.publicComplaints.filter((complaint) => complaint.complaintId !== action.payload);
            })
            .addCase(deleteUserComplaint.rejected, (state, action: PayloadAction<any>) => {
                state.message = action.payload;
            })
            // ------------------------------------------------------------------------------------
            .addCase(getAdminTasks.fulfilled, (state, action) => {
                state.adminTasks = action.payload;
            })
            .addCase(getAdminTasks.rejected, (state, action: PayloadAction<any>) => {
                state.message = action.payload;
            })
            // // ------------------------------------------------------------------------------------
            .addCase(newAdminTasks.fulfilled, (state, action) => {
                let addedTask: any = {
                    taskId: state.adminTasks.length + 1,
                    task: action.payload
                }
                state.adminTasks.push(addedTask);
            })
            .addCase(newAdminTasks.rejected, (state, action: PayloadAction<any>) => {
                state.message = action.payload;
            })
            // // ------------------------------------------------------------------------------------
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.adminTasks = state.adminTasks.filter((task) => task.task !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action: PayloadAction<any>) => {
                state.message = action.payload;
            })
    }
})

export default adminSlice.reducer