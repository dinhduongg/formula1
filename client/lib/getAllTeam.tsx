import axios from "axios"

export default async function getAllTeam(year: string) {
    const response = await axios.get('http://localhost:4000/all-team/get-list-team', { params: { year: year } })

    return response.data.data
}