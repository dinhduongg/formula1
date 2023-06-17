import axios from "axios"

export default async function getAllRace(year: string) {
    const response = await axios.get('http://localhost:4000/race/get-list-race', { params: { year: year } })

    return response.data.data
}