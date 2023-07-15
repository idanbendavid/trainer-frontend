import axios from "axios";
import { toast } from "react-toastify";
import { IExercise } from "../models/IExercise";

async function getExercises(type: string) {
    try {
        let response = await axios.get<IExercise[]>(`${import.meta.env.VITE_EXERCISES_API_NINJA_URL}`, {
            headers: {
                "X-RapidAPI-Key": `${import.meta.env.VITE_RAPID_API_KEY}`,
                "X-RapidAPI-Host": `${import.meta.env.VITE_EXERCISES_API_NINJA_HOST}`
            },
            params: { type }
        })
        return response.data
    }
    catch (error) {
        console.log(error.message)
        toast.error("selected exercises are not available at the moment, try agian later");
    }
}


async function getMuscleImage(muscle: string) {
    try {
        let response = await axios.get(`${import.meta.env.VITE_MUSCLE_IMAGES_API_URL}`, {
            params: {
                muscleGroups: muscle,
                color: '200,100,80'
            },
            headers: {
                'X-RapidAPI-Key': `${import.meta.env.VITE_RAPID_API_KEY}`,
                'X-RapidAPI-Host': `${import.meta.env.VITE_MUSCLE_IMAGES_API_HOST}`
            },
            responseType: "arraybuffer"
        })

        const imageFile = new Blob([response.data]);
        const imageUrl = URL.createObjectURL(imageFile);
        return imageUrl;
    }
    catch (error) {
        toast.error("selected muscle image is not available at the moment, try agian later");
        console.log(error);
    }
}

async function getWorkoutVideo(muscleToVideo: string) {
    try {
        let response = await axios.get(`${import.meta.env.VITE_YOUTUBE_VIDEOS_URL}`, {
            params: {
                q: muscleToVideo
            },
            headers: {
                'X-RapidAPI-Key': `${import.meta.env.VITE_RAPID_API_KEY}` ,
                'X-RapidAPI-Host': `${import.meta.env.VITE_YOUTUBE_VIDEOS_HOST}`
            }
        })
        return response.data
    }
    catch (error) {
        toast.error("selected exercise video is not available at the moment, try agian later");
        console.log(error);
    }
}

async function uploadFilesToServer(formData: any) {
    try {
        let response = await axios.post(`https://traininglogserver.onrender.com/files/`, formData);
        if (response) {
            toast.info("file uploaded successfully")
        }
        return response;
    }
    catch (error) {
        toast.error("error while uploading file, try again later");
        console.log(error);
    }
}

async function getFilesFromServer() {
    try {
        let response = await axios.get(`https://traininglogserver.onrender.com/files/`);
        return response.data;
    }
    catch (error) {
        toast.error(error);
        console.log(error);
    }
}

async function deleteFileFromServer(fileName: string) {
    try {
        let response = await axios.delete(`https://traininglogserver.onrender.com/files/${fileName}`);

        if (response.data) {
            return fileName;
        }
    }
    catch (error) {
        toast.error(error);
        console.log(error);
    }
}

const mediaApiService = {
    getExercises,
    getMuscleImage,
    getWorkoutVideo,
    uploadFilesToServer,
    getFilesFromServer,
    deleteFileFromServer
}

export default mediaApiService