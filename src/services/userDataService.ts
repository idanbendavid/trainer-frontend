import axios from "axios";
import { IUserExerciseDetails } from "../models/IUserExerciseDetails";

async function getUserDetails(){
    const response = await axios.get("http://localhost:3001/users/specificUser");
    console.log(response.data);

    return response.data
}


async function checkEmail(checkEmail: string) {
    const response = await axios.get(`http://localhost:3001/users/checkEmail/${checkEmail}`);

    return response.data;
}

async function changePassword(newPassword: string, email: string) {
    const response = await axios.put('http://localhost:3001/users/', { newPassword, email });
    console.log(response.data);
    return response.data;
}

async function saveUserExerciseDetails(userExerciseDetails: IUserExerciseDetails) {
    const response = await axios.post('http://localhost:3001/TEMP', userExerciseDetails );
    console.log(response.data);
    return response.data;
}


const userDataService = {
    getUserDetails,
    checkEmail,
    changePassword,
    saveUserExerciseDetails
}

export default userDataService
