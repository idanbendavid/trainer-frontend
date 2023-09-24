import axios from "axios";
import { IUserExerciseDetails } from "../models/IUserExerciseDetails";

async function checkEmail(checkEmail: string) {
    const response = await axios.patch(`${import.meta.env.VITE_SERVER_REQUESTS}/users/checkEmail`, { checkEmail });

    return response.data;
}

async function changePassword(newPassword: string, email: string) {
    const response = await axios.put(`${import.meta.env.VITE_SERVER_REQUESTS}/users/`, { newPassword, email });
    return response.data;
}

async function getExerciseOfUser() {
    const response = await axios.get<IUserExerciseDetails[]>(`${import.meta.env.VITE_SERVER_REQUESTS}/usersExercises/exercisesOfUser`);
    return response.data;
}

async function saveUserExerciseDetails(userExerciseDetails: IUserExerciseDetails) {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_REQUESTS}/usersExercises/addExercise`, userExerciseDetails );
    return response.data;
}

const userDataService = {
    checkEmail,
    changePassword,
    getExerciseOfUser,
    saveUserExerciseDetails
}

export default userDataService
