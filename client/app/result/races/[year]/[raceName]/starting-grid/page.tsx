import getStartingGrid from '@/lib/getStartingGrid'
import { IStartingGrid } from '@/types'
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
        title: `FORMULA 1 ${raceName.trim().replaceAll('-', ' ').toUpperCase()} GRAND PRIX ${year} - STARTING GRID`,
        description: `This is the page of ${year} ${raceName} STARTING GRID`
    }
}

export default async function StartingGrid({ params: { year, raceName } }: Props) {
    const startingGridData: Promise<IStartingGrid> = getStartingGrid(year, raceName)
    const staringGrid = await startingGridData
    
    return (
        <main className='container mx-auto'>
            {
                staringGrid?.startingGridDetail.length !== 0
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
                                <th className="px-6 py-3">TIME</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                staringGrid.startingGridDetail.map((result) => {
                                return (
                                    <tr key={result.pos} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <td className='px-6 py-4'>{result.pos}</td>
                                        <td className='px-6 py-4'>{result.no}</td>
                                        <td className='px-6 py-4'>{result.firstname} {result.lastname}</td>
                                        <td className='px-6 py-4'>{result.car}</td>
                                        <td className='px-6 py-4'>{result.time}</td>
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
