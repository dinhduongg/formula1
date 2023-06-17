import axios from "axios"

export default async function getRaceResult(year: string, countryName: string) {
    const response = await axios.get('http://localhost:4000/race/get-race-result', { params: { year, countryName } })

    return response.data.data
}