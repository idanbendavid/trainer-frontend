import axios from "axios";
import { toast } from "react-toastify";
import { IExercise } from "../models/IExercise";

async function getExercises(type: string) {
    try {
        let response = await axios.get<IExercise[]>('https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises', {
            headers: {
                'X-RapidAPI-Key': '81c0c45b69msh9f164b5b4ed305cp1441eejsn833407ae1c5a',
                'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
            },
            params: { type }
        })
        return response.data
    }
    catch (error) {
        console.log(error)
        toast.error(error);
    }
}


async function getMuscleImage(muscle: string) {
    try {
        let response = await axios.get('https://muscle-group-image-generator.p.rapidapi.com/getImage', {
            params: {
                muscleGroups: muscle,
                color: '200,100,80'
            },
            headers: {
                'X-RapidAPI-Key': '81c0c45b69msh9f164b5b4ed305cp1441eejsn833407ae1c5a',
                'X-RapidAPI-Host': 'muscle-group-image-generator.p.rapidapi.com'
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
        let response = await axios.get('https://youtube-search-results.p.rapidapi.com/youtube-search/', {
            params: {
                q: muscleToVideo
            },
            headers: {
                'X-RapidAPI-Key': '81c0c45b69msh9f164b5b4ed305cp1441eejsn833407ae1c5a',
                'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
            }
        })
        return response.data.items[0]
    }
    catch (error) {
        toast.error("selected exercise video is not available at the moment, try agian later");
        console.log(error);
    }
}

async function uploadFilesToServer(formData) {
    try {
        let response = await axios.post(`http://localhost:3001/files/`, formData);
        if (response) {
            toast.info("file uploaded successfully")
        }
        return response;
    }
    catch (error) {
        toast.error("no file was selected");
        console.log(error);
    }
}

async function getFilesFromServer() {
    try {
        let response = await axios.get(`http://localhost:3001/files/`);
        return response.data;
    }
    catch (error) {
        toast.error(error);
        console.log(error);
    }
}

async function deleteFileFromServer(fileName: string) {
    try {
        let response = await axios.delete(`http://localhost:3001/files/${fileName}`);

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