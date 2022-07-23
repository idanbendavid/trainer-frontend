import axios from "axios";
import { IExercise } from "../models/IExercise";

async function addExerciseToUserSchedule(exercise: IExercise): Promise<IExercise> {
    const response = await axios.post('http://localhost:3001/userPractices/', exercise);

    if (response.data) {
    }
    return response.data;
}


const exerciseService = {
    addExerciseToUserSchedule
}

export default exerciseService
