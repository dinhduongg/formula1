import getPitStopSummary from '@/lib/getPitStopSummary'
import { IPitStopSummary } from '@/types'
import React from 'react'
import Sidebar from '../components/Sidebar'

type Props = {
    params: {
        year: string
        raceName: string
    }
}

export function generateMetadata({ params: { year, raceName } }: Props) {
    return {
        title: `FORMULA 1 ${raceName.trim().replaceAll('-', ' ').toUpperCase()} GRAND PRIX ${year} - PIT STOP SUMMARY`,
        description: `This is the page of ${year} ${raceName} PIT STOP SUMMARY`
    }
}

export default async function PitStopSummary({ params: { year, raceName } }: Props) {
    const pitStopSummaryData: Promise<IPitStopSummary> = getPitStopSummary(year, raceName)
    const pitStopSummary = await pitStopSummaryData

    return (
        <main className='container mx-auto'>
            {
                pitStopSummary?.pitStopSummaryDetail.length !== 0
                ?
                <div className='grid grid-cols-12 gap-10'>
                    <div className='col-span-3'>
                        <Sidebar />
                    </div>
                    <div className='col-span-9'>
                    <table className="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">STOPS</th>
                            <th className="px-6 py-3">NO</th>
                            <th className="px-6 py-3">DRIVER</th>
                            <th className="px-6 py-3">CAR</th>
                            <th className="px-6 py-3">LAP</th>
                            <th className="px-6 py-3">TIME OF DAY</th>
                            <th className="px-6 py-3">TIME</th>
                            <th className="px-6 py-3">TOTAL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            pitStopSummary.pitStopSummaryDetail.map((result, index) => {
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className='px-6 py-4'>{result.stops}</td>
                                <td className='px-6 py-4'>{result.no}</td>
                                <td className='px-6 py-4'>{result.firstname} {result.lastname}</td>
                                <td className='px-6 py-4'>{result.car}</td>
                                <td className='px-6 py-4'>{result.laps}</td>
                                <td className='px-6 py-4'>{result.time_of_day}</td>
                                <td className='px-6 py-4'>{result.time}</td>
                                <td className='px-6 py-4'>{result.total}</td>
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
