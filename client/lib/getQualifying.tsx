import axios from "axios"

export default async function getQualifying(year: string, countryName: string) {
    const response = await axios.get('http://localhost:4000/race/get-qualitying', { params: { year, countryName } })

    return response.data.data
}
