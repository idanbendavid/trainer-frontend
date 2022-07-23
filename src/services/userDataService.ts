import axios from "axios";

async function getUserDetails(){
    const response = await axios.get("http://localhost:3001/users/specificUser");
    console.log(response.data);

    return response.data
}

async function changeEmail(newUserEmail: string) {
    const response = await axios.patch('http://localhost:3001/users/changeEmail', { newUserEmail });
    console.log(response.data);
    return response.data;
}

async function changePassword(newUserPassword: string) {
    const response = await axios.patch('http://localhost:3001/users/', newUserPassword);
    console.log(response.data);
    return response.data;
}


const userDataService = {
    getUserDetails,
    changeEmail,
    changePassword
}

export default userDataService
