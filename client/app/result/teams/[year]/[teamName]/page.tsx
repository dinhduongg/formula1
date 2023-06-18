import { getTeamDetail, getTeamByName } from '@/lib/getTeamDetail'
import { ITeam } from '@/types'
import Link from 'next/link'
import React from 'react'
import BarChart from './components/BarChart'

type Props = {
    params: {
        year: string
        teamName: string
    }
}

export function generateMetadata({ params: { year, teamName } }: Props) {
    return {
        title: `${year} CONSTRUCTOR STANDINGS: ${teamName.trim().replaceAll('-', ' ').toUpperCase()}`,
        description: `This is the page of ${year} ${teamName.trim().replaceAll('-', ' ').toUpperCase()}`
    }
}

export default async function TeamDetail({ params: { year, teamName } }: Props) {
  const teamData: Promise<ITeam[]> = getTeamDetail(year, teamName)
  const teambyName: Promise<ITeam[]> = getTeamByName(teamName)

  const [team, byName] = await Promise.all([teamData, teambyName])

  return (
    <main className='container mx-auto'>
        <h1 className='text-4xl my-12'>{year} Constructor Standings: {teamName.replaceAll('-', ' ')}</h1>
        <div>
            <table className="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">GRAND PRIX</th>
                        <th className="px-6 py-3">DATE</th>
                        <th className="px-6 py-3">PTS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        team?.[0]?.teamDetail.map(team => {
                            return (
                                <tr key={team.grandPrix} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <td className='px-6 py-4 font-bold'>
                                        <Link href={`/result/races/${year}/${team.grandPrix.trim().replaceAll(' ', '-')}/race-result`}>{team.grandPrix}</Link>
                                    </td>
                                    <td className='px-6 py-4'>{team.date}</td>
                                    <td className='px-6 py-4'>{team.point}</td>
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
