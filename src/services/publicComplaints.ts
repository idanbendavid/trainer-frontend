import axios from "axios";

async function getAllComplaints() {
    const response = await axios.get(`http://localhost:3001/complaint`)

    console.log(response);

    return response.data
}



async function newComplaint(userComplaint: object) {
    const response = await axios.post(`http://localhost:3001/complaint`, userComplaint)

    console.log(response.data)

    return response.data
}

const publicComplatinsService = {
    getAllComplaints, 
    newComplaint
}


export default publicComplatinsService