import axios from "axios";
import { IUser, LoginDetails } from "../models/User";


async function register(registerUser: IUser): Promise<IUser> {
    const response = await axios.post('http://localhost:3001/users/register', registerUser);

    if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.firstName + " " + response.data.lastName);
        localStorage.setItem("role", response.data.userRole);

        axios.defaults.headers.common['Authorization'] = response.data.token;
    }
    return response.data;
}

async function login(loggedInDetails: LoginDetails): Promise<IUser> {
    const response = await axios.post('http://localhost:3001/users/login', loggedInDetails);

    if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.firstName + " " + response.data.lastName);
        localStorage.setItem("role", response.data.userRole);

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
    const response = await axios.get('http://localhost:3001/users/verify_token');

    return response
}


const authService = {
    register,
    login,
    logout,
    surviveRefresh
}

export default authService