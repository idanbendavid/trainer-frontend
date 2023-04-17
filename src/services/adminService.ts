import axios from "axios";


async function deleteUser(userToDelete: number) {
    const response = await axios.delete(`http://localhost:3001/users/${userToDelete}`)

    return response.data
}

async function getAllUsersForAdmin() {
    const response = await axios.get("http://localhost:3001/users/allUsers")

    return response.data
}

async function getAllComplaints() {
    const response = await axios.get(`http://localhost:3001/complaint`)

    return response.data
}

async function newComplaint(userComplaint: object) {
    const response = await axios.post(`http://localhost:3001/complaint`, userComplaint)

    return response.data
}


async function deleteComplaint(complaintId: number): Promise<number> {
    const response = await axios.delete(`http://localhost:3001/complaint/${complaintId}`)
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
