import axios from "axios";

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

const publicComplatinsService = {
    getAllComplaints,
    newComplaint,
    deleteComplaint
}


export default publicComplatinsService