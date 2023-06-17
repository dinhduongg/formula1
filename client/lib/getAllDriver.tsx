import axios from "axios"

export default async function getAllDriver(year: string) {
    const response = await axios.get('http://localhost:4000/all-driver/get-list-driver', { params: { year: year } })

    return response.data.data
}