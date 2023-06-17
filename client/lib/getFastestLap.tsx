import axios from 'axios'

export default async function getFastestLap(year: string, countryName: string) {
    const response = await axios.get('http://localhost:4000/race/get-fastest-lap', { params: { year, countryName } })

    return response.data.data
}
