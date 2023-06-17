import axios from "axios"

export default async function getAllDHL(year: string) {
    const response = await axios.get('http://localhost:4000/dhl/get-dhl', { params: { year: year } })

    return response.data.data
}