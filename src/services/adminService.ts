import axios from "axios";


async function deleteUser(userToDelete: number) {
    const response = await axios.delete(`${import.meta.env.VITE_SERVER_REQUESTS}/users/${userToDelete}`)

    return response.data
}

async function getAllUsersForAdmin() {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_REQUESTS}/users/allUsers`)

    return response.data
}

async function getAllComplaints() {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_REQUESTS}/complaint`)

    return response.data
}

async function newComplaint(userComplaint: object) {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_REQUESTS}/complaint`, userComplaint)

    return response.data
}


async function deleteComplaint(complaintId: number): Promise<number> {
    const response = await axios.delete(`${import.meta.env.VITE_SERVER_REQUESTS}/complaint/${complaintId}`)
    if(response.data){
        return complaintId;
    }
}


const adminService = {
    deleteUser,
    getAllUsersForAdmin,
    getAllComplaints,
    newComplaint,
    deleteComplaint
}

export default adminService
