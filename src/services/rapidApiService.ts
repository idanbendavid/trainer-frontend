import axios from "axios";

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


const rapidApiService = {
    getListOfBodyParts,
    getExercisesByBodyPart
}

export default rapidApiService