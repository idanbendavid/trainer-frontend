import axios from "axios";


async function deleteUser(userToDelete: number) {
    const response = await axios.delete(`http://localhost:3001/users/:${userToDelete}`)

    console.log(response.data)

    return response.data
}

async function deleteCoach(userToDelete: number, coachId: string) {
    const response = await axios.delete(`http://localhost:3001/users/:${userToDelete}/${coachId}`);

    console.log(response.data)

    return response.data
}


const adminService = {
    deleteUser,
    deleteCoach
}

export default adminService
