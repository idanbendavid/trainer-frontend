import axios from "axios";
import { IUserExerciseDetails } from "../models/IUserExerciseDetails";

async function checkEmail(checkEmail: string) {
    const response = await axios.patch(`https://traininglogserver.onrender.com/users/checkEmail`, { checkEmail });

    return response.data;
}

async function changePassword(newPassword: string, email: string) {
    const response = await axios.put('https://traininglogserver.onrender.com/users/', { newPassword, email });
    return response.data;
}

async function getExerciseOfUser() {
    const response = await axios.get<IUserExerciseDetails[]>('https://traininglogserver.onrender.com/usersExercises/exercisesOfUser');
    return response.data;
}

async function saveUserExerciseDetails(userExerciseDetails: IUserExerciseDetails) {
    const response = await axios.post('https://traininglogserver.onrender.com/usersExercises/addExercise', userExerciseDetails );
    return response.data;
}

const userDataService = {
    checkEmail,
    changePassword,
    getExerciseOfUser,
    saveUserExerciseDetails
}

export default userDataService
