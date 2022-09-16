import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import mediaApiService from '../../services/mediaApiService';

const initialState = {
    message: "",
    isError: false,
    isSuccess: false,
    gallery: []
}

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

export const mediaSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
        reset: (state) => state = initialState,
        // ---------------------------------------------------------------
    },
    extraReducers: (builder) => {
        builder
        .addCase(getFilesFromServer.fulfilled, (state, action)=>{
            state.gallery = action.payload;
        })
        .addCase(getFilesFromServer.rejected, (state, action)=>{
            state.message = "failed loading images";
        })

    }
})

export default mediaSlice.reducer