import axios from "axios";

async function getCoaches(){
    const response = await axios.get("http://localhost:3001/coach")

    console.log(response)

    return response.data
}

async function getDataAboutCoachAthletes(coachId: string){
    const response = await axios.get(`http://localhost:3001/coach/${coachId}`)

    console.log(response)

    return response.data
}

const coachService = {
    getCoaches,
    getDataAboutCoachAthletes
}

export default coachService