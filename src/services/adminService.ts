import axios from "axios";


async function deleteUser(userToDelete: number) {
    const response = await axios.delete(`http://34.65.141.75:3001/users/${userToDelete}`)

    return response.data
}

async function getAllUserForAdmin() {
    const response = await axios.get("http://34.65.141.75:3001/users/allUsers")

    return response.data
}

async function getAdminTasks() {
    const response = await axios.get("http://34.65.141.75:3001/adminTasks/")
    return response.data
}

async function addNewTask(newTask: string) {
    const response = await axios.post("http://34.65.141.75:3001/adminTasks/", { newTask })
    if (response.data) {
        return newTask
    }
}

async function deleteTask(task: string) {
    const response = await axios.delete(`http://34.65.141.75:3001/adminTasks/${task}`);
    if (response.data) {
        return task
    }
}


const adminService = {
    deleteUser,
    getAllUserForAdmin,
    getAdminTasks,
    addNewTask,
    deleteTask
}

export default adminService
