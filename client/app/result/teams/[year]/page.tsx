import getAllTeam from '@/lib/getAllTeam'
import { IAllTeam } from '@/types'
import Link from 'next/link'

type Props = {
    params: {
        year: string
    }
}

export function generateMetadata({ params: { year } }: Props) {
    return {
        title: `${year} CONSTRUCTOR STANDINGS`,
        description: `This is the page of all Team at ${year}`
    }
}

export default async function AllTeam({ params: { year } }: Props) {
    const teamData: Promise<IAllTeam> = getAllTeam(year)
    const allTeam = await teamData

    return (
        <main className='container mx-auto'>
            <h1 className='text-4xl my-12'>{year} CONSTRUCTORS STANDINGS</h1>
            <table className="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">POS</th>
                        <th className="px-6 py-3">TEAM</th>
                        <th className="px-6 py-3">POINT</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allTeam.teams.map(team => {
                            return (
                                <tr key={team.pos} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <td className='px-6 py-4'>{team.pos}</td>
                                    <td className='px-6 py-4 font-bold'>
                                        <Link href={`/result/teams/${year}/${team.team_name.trim().replaceAll(' ', '-')}`}>{team.team_name}</Link>    
                                    </td>
                                    <td className='px-6 py-4'>{team.point}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </main>
    )
}
