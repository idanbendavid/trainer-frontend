import axios from "axios";

async function addExerciseToUserSchedule(data: {}) {
    const response = await axios.post('http://localhost:3001/userExercises/addExercise', data);
    if (response.data) {
    }
    return response.data;
}

async function getExercisesOfUser() {
    const response = await axios.get('http://localhost:3001/userExercises/exercisesOfUser');
    
    return response.data
}

async function deleteExerciseOfUser(exerciseId: number){
    const response = await axios.delete(`http://localhost:3001/userExercises/deleteExercise/${exerciseId}`);

    return response.data
}

const exerciseService = {
    addExerciseToUserSchedule,
    getExercisesOfUser,
    deleteExerciseOfUser
}

export default exerciseService
