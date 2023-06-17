import getPractice3 from '@/lib/getPractice3'
import { IPractice } from '@/types'
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
    title: `FORMULA 1 ${raceName.trim().replaceAll('-', ' ').toUpperCase()} GRAND PRIX ${year} - PRACTICE 3`,
    description: `This is the page of ${year} ${raceName} PRACTICE 3`
  }
}

export default async function Practice3({ params: { year, raceName } }: Props) {
    const practiceData: Promise<IPractice> = getPractice3(year, raceName)
    const practice = await practiceData
  
    return (
        <main className='container mx-auto'>
          {
            practice?.practiceDetail.length !== 0
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
                          <th className="px-6 py-3">GAP</th>
                          <th className="px-6 py-3">LAPS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        practice.practiceDetail.map(result => {
                          return (
                            <tr key={result.pos} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                              <td className='px-6 py-4'>{result.pos}</td>
                              <td className='px-6 py-4'>{result.no}</td>
                              <td className='px-6 py-4'>{result.firstname} {result.lastname}</td>
                              <td className='px-6 py-4'>{result.car}</td>
                              <td className='px-6 py-4'>{result.time}</td>
                              <td className='px-6 py-4'>{result.gap}</td>
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
