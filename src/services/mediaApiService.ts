import axios from "axios";
import { toast } from "react-toastify";

async function getListOfBodyParts() {

    let response = await axios.get('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_TRAINER_RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_TRAINER_RAPID_API_HOST
        },
    })

    return response.data
}

async function getExercisesByBodyPart(bodyPart: string) {

    let response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_TRAINER_RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_TRAINER_RAPID_API_HOST
        }
    })

    return response.data
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
    let response = await axios.get(`http://localhost:3001/files/`);

    return response.data;
}

async function deleteFileFromServer(fileName: string) {
    let response = await axios.delete(`http://localhost:3001/files/${fileName}`);

    if (response.data) {
        return fileName;
    }
}

const mediaApiService = {
    getListOfBodyParts,
    getExercisesByBodyPart,
    uploadFilesToServer,
    getFilesFromServer,
    deleteFileFromServer
}

export default mediaApiService