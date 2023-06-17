import getAllRace from '@/lib/getAllRace'
import { IAllRace } from '@/types'
import Link from 'next/link'

type Props = {
    params: {
        year: string
    }
}

export function generateMetadata({ params: { year } }: Props) {
    return {
        title: `${year} RACE RESULTS`,
        description: `This is the page of all Race at ${year}`
    }
}

export default async function AllRace({ params: { year } }: Props) {
    const raceData: Promise<IAllRace> = getAllRace(year)
    const allRace = await raceData

    return (
        <main className='container mx-auto'>
            <h1 className='text-4xl my-12'>{year} RACES RESULTS</h1>
            <div>
                <table className="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">GRAND PRIX</th>
                        <th className="px-6 py-3">DATE</th>
                        <th className="px-6 py-3">WINNER</th>
                        <th className="px-6 py-3">CAR</th>
                        <th className="px-6 py-3">LAPS</th>
                        <th className="px-6 py-3">TIME</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allRace.races.map((race, index) => {
                            return (
                            <tr key={race.prix + index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className='px-6 py-4 font-bold'>
                                    <Link href={`/result/races/${year}/${race.prix.trim().replaceAll(' ', '-')}/race-result`}>{race.prix}</Link>
                                </td>
                                <td className='px-6 py-4'>{race.date}</td>
                                <td className='px-6 py-4'>{race.firstname} {race.lastname}</td>
                                <td className='px-6 py-4'>{race.car}</td>
                                <td className='px-6 py-4'>{race.laps}</td>
                                <td className='px-6 py-4'>{race.time}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
                </table>
            </div>
        </main>
    )
}
