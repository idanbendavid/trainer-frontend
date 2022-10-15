import axios from "axios";
import { toast } from "react-toastify";

async function addExerciseToUserSchedule(data) {
    const response = await axios.post('http://localhost:3001/userExercises/addExercise', data);
    if (response.data) {
        toast.info(`an exercise has been added for the selected date`)
    }
    return response.data;
}

async function getExercisesOfUser() {
    const response = await axios.get('http://localhost:3001/userExercises/exercisesOfUser');

    return response.data
}

async function getAmountOfExercisesPerDateForUser() {
    const response = await axios.get('http://localhost:3001/userExercises/amountOfExercises');

    return response.data
}

async function deleteExerciseOfUser(exerciseId: number) {
    const response = await axios.delete(`http://localhost:3001/userExercises/deleteExercise/${exerciseId}`);
    if(response.data){
        return exerciseId;
    }
}

const exerciseService = {
    addExerciseToUserSchedule,
    getExercisesOfUser,
    getAmountOfExercisesPerDateForUser,
    deleteExerciseOfUser
}

export default exerciseService
