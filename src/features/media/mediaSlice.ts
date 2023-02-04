import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { IApiNinjas } from '../../models/IApiNinjas';
import mediaApiService from '../../services/mediaApiService';

const initialState = {
    message: "",
    isError: false,
    isSuccess: false,
    gallery: [],
    exercises: [] as IApiNinjas[],
    image: "" || null
}

export const getExercisesFromApi = createAsyncThunk("exercises/apiNinja", async (params: object) => {
    try {
        const response = await mediaApiService.getExercises(params);
        return response;
    }
    catch (error) {
        const message = error;
        toast.info(message);
        return message;
    }
})

export const getImageOfMuscle = createAsyncThunk("muscleImage/MuscleGroupImageGenerator", async (muscle: string) => {
    try {
        const response = await mediaApiService.getMuscleImage(muscle);
        return response;
    }
    catch (error) {
        const message: string = error.response.data.error;
        toast.info(message);
        return message;
    }
})

export const getFilesFromServer = createAsyncThunk("files/getFiles", async () => {
    try {
        const response = await mediaApiService.getFilesFromServer();
        return response;
    }
    catch (error) {
        const message: string = error.response.data.error;
        toast.info(message);
        return message;
    }
})

export const deleteFileFromServer = createAsyncThunk("files/deleteFile", async (fileName: string) => {
    try {
        const response = await mediaApiService.deleteFileFromServer(fileName);
        return response;
    }
    catch (error) {
        const message: string = error.response.data.error;
        toast.info(message);
        return message;
    }
})

export const mediaSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
        reset: (state) => state = initialState,
        // ---------------------------------------------------------------
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExercisesFromApi.fulfilled, (state, action) => {
                state.exercises = action.payload;
            })
            .addCase(getExercisesFromApi.rejected, (state, action) => {
            })
            .addCase(getImageOfMuscle.fulfilled, (state, action) => {
                state.image = action.payload;
            })
            .addCase(getImageOfMuscle.rejected, (state, action) => {
            })
            .addCase(getFilesFromServer.fulfilled, (state, action) => {
                state.gallery = action.payload;
            })
            .addCase(getFilesFromServer.rejected, (state, action) => {
                state.message = "failed loading images";
            })
            // -----------------------------------------------------
            .addCase(deleteFileFromServer.fulfilled, (state, action) => {
                state.gallery = state.gallery.filter((file) => file.file_name !== action.payload);
            })
            .addCase(deleteFileFromServer.rejected, (state, action: PayloadAction<any>) => {
                state.message = action.payload;
            })
    }
})

export const { reset } = mediaSlice.actions
export default mediaSlice.reducer