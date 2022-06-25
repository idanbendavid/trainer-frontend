import axios from "axios";
import { IPractice } from "../../models/IPractice";

async function getAllPractices() {
    try {
        const response = await axios.get(`http://localhost:3001/practices/`)
        return response.data
    }
    catch (error: any) {
        const message: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return message
    }
}

async function createPractice(newPractice: IPractice) {
    const response = await axios.post(`http://localhost:3001/practices/`, newPractice)

    console.log(response.data)

    return response.data
}

async function updatePractice(editPractice: IPractice) {
    const response = await axios.put(`http://localhost:3001/practices/`, editPractice)

    console.log(response.data)

    return response.data
}

async function deletePractice(practiceToDelete: number) {
    const response = await axios.delete(`http://localhost:3001/practices/${practiceToDelete}`)

    console.log(response.data)

    return response.data
}


const practicesService = {
    getAllPractices,
    createPractice,
    updatePractice,
    deletePractice
}

export default practicesService
