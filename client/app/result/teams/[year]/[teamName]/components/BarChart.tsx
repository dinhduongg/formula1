'use client'

import { ITeam } from '@/types'
import { CategoryScale, Chart as ChartJS } from 'chart.js/auto'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale)

type Props = {
    chartData: ITeam[]
}

export default function BarChart({ chartData }: Props) {
    const [data, setData] = useState({
        labels: chartData.map((team) => team.year ),
        datasets: [{
            label: 'Trung bình điểm theo từng năm',
            data: chartData.map((team) => +team.avg_point),
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
            ]
        }]
    })

  return (
    <Bar data={data} />
  )
}
