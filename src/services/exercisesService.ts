import axios from "axios";
import { IExercise } from "../models/IExercise";

async function addExerciseToUserSchedule(data: {}) {
    const response = await axios.post('http://localhost:3001/userPractices/addPractice', data);
    if (response.data) {
    }
    return response.data;
}


const exerciseService = {
    addExerciseToUserSchedule
}

export default exerciseService
