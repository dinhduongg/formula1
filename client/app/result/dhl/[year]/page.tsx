import getAllDHL from '@/lib/getAllDHL'
import { IDhl } from '@/types'

type Props = {
    params: {
        year: string
    }
}

export function generateMetadata({ params: { year } }: Props) {
    return {
        title: `${year} DHL FASTEST LAP AWARD`,
        description: `This is the page of all Fastest Lap Award at ${year}`
    }
}

export default async function AllTeam({ params: { year } }: Props) {
    const dhlData: Promise<IDhl> = getAllDHL(year)
    const allDHL = await dhlData

    return (
        <main className='container mx-auto'>
            <h1 className='text-4xl my-12'>{year} DHL FASTEST LAP AWARD</h1>
            <p className='text-[#1e1e1e] text-sm mb-12'>
                Every Formula 1 driver is fast, but is the race winner really the fastest? Since 2007 DHL has defined a new standard of speed with the &apos;DHL Fastest Lap Award&apos;. One driver sets the fastest lap at each race - the award will go to the man who sets the most over the season. To win will require pure speed - something DHL, as the world&apos;s leading logistics provider and Official Logistics Partner of Formula 1, uses to achieve its goals, shortening international routes, facilitating global trade and making the world a smaller place.
            </p>
            <div>
                <table className="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">GRAND PRIX</th>
                        <th className="px-6 py-3">DRIVER</th>
                        <th className="px-6 py-3">CAR</th>
                        <th className="px-6 py-3">TIME</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allDHL.dhlDetail.map(dhl => {
                            return (
                            <tr key={dhl.grandPrix} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className='px-6 py-4'>{dhl.grandPrix}</td>
                                <td className='px-6 py-4'>{dhl.firstname} {dhl.lastname}</td>
                                <td className='px-6 py-4'>{dhl.car}</td>
                                <td className='px-6 py-4'>{dhl.time}</td>
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