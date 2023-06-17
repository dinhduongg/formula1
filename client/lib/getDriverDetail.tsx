import axios from "axios"

export default async function getDriverDetail(year: string, options3: string) {
    const firstname = options3.split('-')[1]
    const lastname = options3.split('-')[0]
    const response = await axios.get('http://localhost:4000/driver/get-driver', { params: { firstname, lastname, year } })

    return response.data.data
}