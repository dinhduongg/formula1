import getQualifying from '@/lib/getQualifying'
import { IQualifying } from '@/types'
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
        title: `FORMULA 1 ${raceName.trim().replaceAll('-', ' ').toUpperCase()} GRAND PRIX ${year} - QUALIFYING`,
        description: `This is the page of ${year} ${raceName} QUALIFYING`
    }
}

export default async function Qualifying({ params: { year, raceName } }: Props) {
    const qualifyingData: Promise<IQualifying> = getQualifying(year, raceName)
    const qualifying = await qualifyingData

    return (
        <main className='container mx-auto'>
            {
                qualifying?.qualifyingDetail.length !== 0
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
                            <th className="px-6 py-3">Q1</th>
                            <th className="px-6 py-3">Q2</th>
                            <th className="px-6 py-3">Q3</th>
                            <th className="px-6 py-3">LAPS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            qualifying.qualifyingDetail.map((result) => {
                            return (
                                <tr key={result.pos} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className='px-6 py-4'>{result.pos}</td>
                                <td className='px-6 py-4'>{result.no}</td>
                                <td className='px-6 py-4'>{result.firstname} {result.lastname}</td>
                                <td className='px-6 py-4'>{result.car}</td>
                                <td className='px-6 py-4'>{result.q3}</td>
                                <td className='px-6 py-4'>{result.q2}</td>
                                <td className='px-6 py-4'>{result.q1}</td>
                                <td className='px-6 py-4'>{result.laps}</td>
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
