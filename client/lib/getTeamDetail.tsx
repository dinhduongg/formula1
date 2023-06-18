import axios from "axios"

export async function getTeamDetail(year: string, options3: string) {
    const name = options3.replaceAll('-', ' ')
    const response = await axios.get('http://localhost:4000/team/get-team', { params: { year, name } })

    return response.data.data
}

export async function getTeamByName(options3: string) {
    const name = options3.replaceAll('-', ' ')
    const response = await axios.get('http://localhost:4000/team/get-team', { params: { name } })

    return response.data.data
}