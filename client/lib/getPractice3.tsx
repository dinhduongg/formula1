import axios from 'axios'

export default async function getPractice3(year: string, countryName: string) {
    const response = await axios.get('http://localhost:4000/race/get-practice3', { params: { year, countryName } })

    return response.data.data
}
