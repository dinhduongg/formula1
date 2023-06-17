import axios from 'axios'
import React from 'react'

export default async function getPitStopSummary(year: string, countryName: string) {
  const response = await axios.get('http://localhost:4000/race/get-pit-stop', { params: { year, countryName } })

  return response.data.data
}
