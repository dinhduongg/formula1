import { getDriverDetail, getDriverByName } from '@/lib/getDriverDetail'
import { IDriver } from '@/types'
import Link from 'next/link'
import React from 'react'
import BarChart from './components/BarChart'

type Props = {
    params: {
        year: string
        driverName: string
    }
}

export function generateMetadata({ params: { year, driverName } }: Props) {
    return {
        title: `${year} DRIVER STANDINGS: ${driverName.trim().replaceAll('-', ' ').toUpperCase()}`,
        description: `This is the page of ${year} ${driverName.trim().replaceAll('-', ' ').toUpperCase()}`
    }
}

export default async function DriverDetail({ params: { year, driverName } }: Props) {
  const driverData: Promise<IDriver[]> = getDriverDetail(year, driverName)  
  const driverByName: Promise<IDriver[]> = getDriverByName(driverName)

//   const driver = await driverData
  const [driver, byName] = await Promise.all([driverData, driverByName])

  return (
    <main className='container mx-auto'>
        <h1 className='text-4xl my-12'>{year} Driver Standings: {driverName.split('-')[1]} {driverName.split('-')[0]}</h1>
        <div>
            <table className="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">GRAND PRIX</th>
                        <th className="px-6 py-3">DATE</th>
                        <th className="px-6 py-3">CAR</th>
                        <th className="px-6 py-3">RACE POSITION</th>
                        <th className="px-6 py-3">PTS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        driver?.[0].driverDetail.map(driver => {
                            return (
                                <tr key={driver.grandPrix} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <td className='px-6 py-4 font-bold'>
                                        <Link href={`/result/races/${year}/${driver.grandPrix.trim().replaceAll(' ', '-')}/race-result`}>{driver.grandPrix}</Link>
                                    </td>
                                    <td className='px-6 py-4'>{driver.date}</td>
                                    <td className='px-6 py-4 font-bold'>
                                        <Link href={`/result/teams/${year}/${driver.car.trim().replaceAll(' ', '-')}`}>{driver.car}</Link>    
                                    </td>
                                    <td className='px-6 py-4'>{driver.racePosition}</td>
                                    <td className='px-6 py-4'>{driver.point}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        <div className='w-3/4 mt-10 mx-auto'>
            <BarChart chartData={byName} />
        </div>
    </main>
  )
}
