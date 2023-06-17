import getAllDriver from '@/lib/getAllDriver'
import { IAllDriver } from '@/types'
import Link from 'next/link'

type Props = {
    params: {
        year: string
    }
}

export function generateMetadata({ params: { year } }: Props) {
    return {
        title: `${year} DRIVER STANDINGS`,
        description: `This is the page of all Driver at ${year}`
    }
}

export default async function AllDriver({ params: { year } }: Props) {
    const driverData: Promise<IAllDriver> = getAllDriver(year)
    const allDriver = await driverData

    return (
        <main className='container mx-auto'>
            <h1 className='text-4xl my-12'>{year} DRIVERS STANDINGS</h1>
            <table className="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">POS</th>
                        <th className="px-6 py-3">DRIVER</th>
                        <th className="px-6 py-3">NATIONALITY</th>
                        <th className="px-6 py-3">CAR</th>
                        <th className="px-6 py-3">PTS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allDriver.drivers.map(driver => {
                            return (
                                <tr key={driver.pos} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <td className='px-6 py-4'>{driver.pos}</td>
                                    <td className='px-6 py-4 font-bold'>
                                        <Link href={`/result/drivers/${year}/${driver.lastname}-${driver.firstname}`}>{driver.firstname} {driver.lastname}</Link>
                                    </td>
                                    <td className='px-6 py-4'>{driver.nationality}</td>
                                    <td className='px-6 py-4 font-bold'>
                                        <Link href={`/result/teams/${year}/${driver.car.trim().replaceAll(' ', '-')}`}>{driver.car}</Link>
                                    </td>
                                    <td className='px-6 py-4'>{driver.point}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </main>
    )
}
