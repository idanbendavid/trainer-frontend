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

async function checkEmail(checkEmail: string) {
    const response = await axios.get(`http://localhost:3001/users/checkEmail/${checkEmail}`);

    return response.data;
}

async function changePassword(newPassword: string, email: string) {
    const response = await axios.put('http://localhost:3001/users/', { newPassword, email });
    console.log(response.data);
    return response.data;
}


const userDataService = {
    getUserDetails,
    changeEmail,
    checkEmail,
    changePassword
}

export default userDataService
