import axios from "axios";


async function deleteUser(userToDelete: number) {
    const response = await axios.delete(`https://traininglogserver.onrender.com/users/${userToDelete}`)

    return response.data
}

async function getAllUsersForAdmin() {
    const response = await axios.get("https://traininglogserver.onrender.com/users/allUsers")

    return response.data
}

async function getAllComplaints() {
    const response = await axios.get(`https://traininglogserver.onrender.com/complaint`)

    return response.data
}

async function newComplaint(userComplaint: object) {
    const response = await axios.post(`https://traininglogserver.onrender.com/complaint`, userComplaint)

    return response.data
}


async function deleteComplaint(complaintId: number): Promise<number> {
    const response = await axios.delete(`https://traininglogserver.onrender.com/complaint/${complaintId}`)
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
