import axios from "axios"

export default async function getTeamDetail(year: string, options3: string) {
    const name = options3.replaceAll('-', ' ')
    const response = await axios.get('http://localhost:4000/team/get-team', { params: { year, name } })

    return response.data.data
}