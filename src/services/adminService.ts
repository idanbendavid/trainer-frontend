import axios from "axios";


async function deleteUser(userToDelete: number) {
    const response = await axios.delete(`http://localhost:3001/users/${userToDelete}`)

    console.log(response.data)

    return response.data
}


const adminService = {
    deleteUser,
}

export default adminService
