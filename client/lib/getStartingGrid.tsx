import axios from 'axios'

export default async function getStartingGrid(year: string, countryName: string) {
    const response = await axios.get('http://localhost:4000/race/get-starting-grid', { params: { year, countryName } })

    return response.data.data
}
