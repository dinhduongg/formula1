'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link'
import React from 'react'

const routes = [
    { path: 'race-result', title: 'Race Result' },
    { path: 'fastest-laps', title: 'Fastest Laps' },
    { path: 'pit-stop-summary', title: 'Pit Stop Summary' },
    { path: 'starting-grid', title: 'Starting Grid' },
    { path: 'qualifying', title: 'Qualifying' },
    { path: 'practice3', title: 'Practice 3' },
    { path: 'practice2', title: 'Practice 2' },
    { path: 'practice1', title: 'Practice 1' },
]

export default function Sidebar() {
    const currentRoute = usePathname()

    return (
        <main>
            <ul className='space-y-1'>
                {
                    routes.map((route, index) => {
                        return (
                            <li key={index}>
                                <Link href={route.path} className={`block py-4 px-4 hover:bg-gray-200 border-b border-b-gray-300 ${currentRoute.includes(route.path) && 'bg-gray-300 border-l-4 border-l-gray-600'}`}>{route.title}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}
