import axios from "axios";


async function deleteUser(userToDelete: number) {
    const response = await axios.delete(`http://localhost:3001/users/${userToDelete}`)

    return response.data
}

async function getAllUserForAdmin() {
    const response = await axios.get("http://localhost:3001/users/allUsers")

    return response.data
}


const adminService = {
    deleteUser,
    getAllUserForAdmin
}

export default adminService
