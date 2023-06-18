'use client'

import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale } from 'chart.js/auto'
import { IDriver, IDriverDetail } from '@/types'

ChartJS.register(CategoryScale)

type Props = {
    chartData: IDriver[]
}

export default function BarChart({ chartData }: Props) {
    console.log(chartData);
    

    const [data, setData] = useState({
        labels: chartData.map((driver) => driver.year ),
        datasets: [{
            label: 'Trung bình điểm theo từng năm',
            data: chartData.map((driver) => +driver.avg_point),
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
