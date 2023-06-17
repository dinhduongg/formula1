import axios from 'axios'

export default async function getPractice2(year: string, countryName: string) {
    const response = await axios.get('http://localhost:4000/race/get-practice2', { params: { year, countryName }, maxContentLength: Infinity })

    return response.data.data
}
