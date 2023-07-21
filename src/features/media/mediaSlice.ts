import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { IExercise } from '../../models/IExercise';
import mediaApiService from '../../services/mediaApiService';

const initialState = {
    message: "",
    isError: false,
    isSuccess: false,
    gallery: [],
    exercises: [] as IExercise[],
    image: "" || undefined,
    exercisesNameArray: [] as string[],
    video: {
        author: {},
        badges: [],
        bestThumbnail: {},
        description: null || "",
        duration: "",
        id: "",
        isLive: false,
        isUpcoming: false,
        thumbnails: [],
        title: "",
        type: "video",
        upcoming: "" || null,
        uploadedAt: "",
        url: "",
        views: 0
    },
    originalQuery: ""
}

export const getExercisesFromApi = createAsyncThunk("exercises/apiNinja", async (type: string) => {
    try {
        const response = await mediaApiService.getExercises(type);
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

export const getWorkoutVideo = createAsyncThunk("muscleVideo/youtubeSearchResults", async (muscleToVideo: string) => {
    try {
        const response = await mediaApiService.getWorkoutVideo(muscleToVideo);
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
        resetImage: (state) => state.image = initialState.image,
        resetExerciseNamesArray: (state) => { state.exercisesNameArray = initialState.exercisesNameArray },
        resetVideo: (state) => {state.video = initialState.video}
        // ---------------------------------------------------------------
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExercisesFromApi.fulfilled, (state, action: PayloadAction<[]>) => {
                state.exercises = action.payload;
                state.exercises.forEach(exercise => {
                    state.exercisesNameArray.push(exercise.name)
                });
            })
            .addCase(getExercisesFromApi.rejected, (state, action: PayloadAction<{}>) => {
            })
            // -----------------------------------------------------
            .addCase(getImageOfMuscle.fulfilled, (state, action: PayloadAction<string>) => {
                state.image = action.payload;
            })
            .addCase(getImageOfMuscle.rejected, (state, action: PayloadAction<{}>) => {
            })
            // -----------------------------------------------------
            .addCase(getFilesFromServer.fulfilled, (state, action: PayloadAction<[]>) => {
                state.gallery = action.payload;
            })
            .addCase(getFilesFromServer.rejected, (state, action: PayloadAction<{}>) => {
                state.message = "failed loading images";
            })
            // -----------------------------------------------------
            .addCase(getWorkoutVideo.fulfilled, (state, action) => {
                state.video = action.payload.items[0];
                state.originalQuery = action.payload.originalQuery;
            })
            .addCase(getWorkoutVideo.pending, (state, action) => {
                state.video = initialState.video
            })
            .addCase(getWorkoutVideo.rejected, (state, action) => {
                state.message = "failed getting video";
            })
            // -----------------------------------------------------
            .addCase(deleteFileFromServer.fulfilled, (state, action: PayloadAction<{}>) => {
                state.gallery = state.gallery.filter((file) => file.file_name !== action.payload);
            })
            .addCase(deleteFileFromServer.rejected, (state, action: PayloadAction<Object | string>) => {
                // state.message = action.payload;
            })
    }
})

export const { reset, resetImage, resetExerciseNamesArray,resetVideo } = mediaSlice.actions
export default mediaSlice.reducer