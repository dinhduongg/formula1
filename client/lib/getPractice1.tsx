import axios from 'axios'

export default async function getPractice1(year: string, countryName: string) {
    const response = await axios.get('http://localhost:4000/race/get-practice1', { params: { year, countryName } })

    return response?.data.data
}
