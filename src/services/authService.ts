import axios from "axios";
import { ILogin } from "../models/ILogin";
import { IUser } from "../models/IUser";


async function register(registerUser: IUser): Promise<IUser> {
    const response = await axios.post('http://34.65.141.75:3001/users/register', registerUser);

    if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.newUser.email);
        localStorage.setItem("name", response.data.newUser.firstName + " " + response.data.newUser.lastName);
        localStorage.setItem("role", response.data.newUser.userRole);

        axios.defaults.headers.common['Authorization'] = response.data.token;
    }
    return response.data;
}

async function login(loggedInDetails: ILogin): Promise<IUser> {
    const response = await axios.post('http://34.65.141.75:3001/users/login', loggedInDetails);

    if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.loginDetails.email);
        localStorage.setItem("name", response.data.loginDetails.firstName + " " + response.data.loginDetails.lastName);
        localStorage.setItem("role", response.data.loginDetails.userRole);

        axios.defaults.headers.common['Authorization'] = response.data.token;
    }
    return response.data;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
}


async function surviveRefresh() {
    const response = await axios.get('http://34.65.141.75:3001/users/verify_token');

    return response
}


const authService = {
    register,
    login,
    logout,
    surviveRefresh
}

export default authService