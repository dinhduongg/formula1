import React from 'react'
import Sidebar from '../components/Sidebar'
import getFastestLap from '@/lib/getFastestLap'
import { IFastestLap } from '@/types'

type Props = {
  params: {
    year: string
    raceName: string
  }
}

export function generateMetadata({ params: { year, raceName } }: Props) {
  return {
    title: `FORMULA 1 ${raceName.trim().replaceAll('-', ' ').toUpperCase()} GRAND PRIX ${year} - FASTEST LAPS`,
    description: `This is the page of ${year} ${raceName} fastest laps`
  }
}

export default async function FastestLap({ params: { year, raceName } }: Props) {
  const fastestLapData: Promise<IFastestLap> = getFastestLap(year, raceName)
  const fastestLap = await fastestLapData

  return (
    <main className='container mx-auto'>
      {
          fastestLap?.fastestLapDetail.length !== 0
          ?
            <div className='grid grid-cols-12 gap-10'>
              <div className='col-span-3'>
                  <Sidebar />
              </div>
              <div className='col-span-9'>
                <table className="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3">POS</th>
                      <th className="px-6 py-3">NO</th>
                      <th className="px-6 py-3">DRIVER</th>
                      <th className="px-6 py-3">CAR</th>
                      <th className="px-6 py-3">LAP</th>
                      <th className="px-6 py-3">TIME OF DAY</th>
                      <th className="px-6 py-3">TIME</th>
                      <th className="px-6 py-3">AVG SPEED</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    fastestLap?.fastestLapDetail.map(result => {
                      return (
                        <tr key={result.pos} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className='px-6 py-4'>{result.pos}</td>
                        <td className='px-6 py-4'>{result.no}</td>
                        <td className='px-6 py-4'>{result.firstname} {result.lastname}</td>
                        <td className='px-6 py-4'>{result.car}</td>
                        <td className='px-6 py-4'>{result.lap}</td>
                        <td className='px-6 py-4'>{result.time_of_day}</td>
                        <td className='px-6 py-4'>{result.time}</td>
                        <td className='px-6 py-4'>{result.avg_speed}</td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </table>
              </div>
            </div>
          : <div>No results are currently available</div>
      }
    </main>
  )
}
