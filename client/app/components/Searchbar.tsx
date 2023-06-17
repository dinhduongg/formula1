'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { IAllRace } from '@/types'
import axios from 'axios'
import SelectComp from './Select'

type finalResult = {
    option1: string
    option2: string
    option3: string
}

export default function Searchbar() {
    const currentYear = new Date().getFullYear()
    const router = useRouter()

    const [defaultOption1] = useState({ value: currentYear.toString(), label: currentYear.toString() })
    const [defaultOption2] = useState({ value: 'races', label: 'races' })
    const [defaultOption3] = useState({ value: 'All', label: 'All' })
    const [options3, setOptions3] = useState<any[]>([])
    const [finalResult, setFinalResult] = useState<finalResult>({ option1: currentYear.toString(), option2: 'races', option3: 'All' })
    const [loading, setLoading] = useState(false)

    const optionsYear: any = []

    for (var i =0; i < 50; i++) {
        const year = {
            value: currentYear - i,
            label: currentYear - i
        }

        optionsYear.push(year)
    }

    const options2 = [
        { value: 'races', label: 'races' },
        { value: 'drivers', label: 'drivers' },
        { value: 'teams', label: 'teams' },
        { value: 'dhl', label: 'dhl fastest lap award' }
    ]

    const handleYearChange = (value: string) => {
        if (finalResult.option3 !== 'All') {
            setFinalResult((prev: finalResult) => ({
                ...prev,
                option1: value,
                option3: 'All'
            }))
            setOptions3([])
        }

        setFinalResult((prev: finalResult) => ({
            ...prev,
            option1: value,
        }))

        router.push(`/result/${finalResult.option2}/${value}`)
    }
    
    const handleOption2Change = (value: string) => {
        if (finalResult.option3 !== 'All') {
            setFinalResult((prev: finalResult) => ({
                ...prev,
                option2: value,
                option3: 'All'
            }))
            setOptions3([])
        }

        setFinalResult((prev: finalResult) => ({
            ...prev,
            option2: value,
        }))
        
        router.push(`/result/${value}/${finalResult.option1}`)
    }

    const handleOption3Change = (value: string) => {
        setFinalResult((prev: finalResult) => ({
            ...prev,
            option3: value,
        }))

        if (value !== 'All') {
            if (finalResult.option2 === 'drivers') {
                router.push(`/result/drivers/${finalResult.option1}/${value.trim().replaceAll(', ', '-')}`)
                return
            } else if (finalResult.option2 === 'teams') {
                router.push(`/result/teams/${finalResult.option1}/${value.trim().replaceAll(' ', '-')}`)
                return
            } else if (finalResult.option2 === 'races') {
                router.push(`/result/races/${finalResult.option1}/${value.trim().replaceAll(' ', '-')}/race-result`)
                return
            }
        }

        router.push(`/result/${finalResult.option2}/${finalResult.option1}`)
    }

    useEffect(() => {
        setLoading(true)

        const getRaceName = async () => {
            const results = await axios.get('http://localhost:4000/race/get-list-race', { params: { year: finalResult.option1 } })
            setOptions3((results.data.data as IAllRace).names)
            setLoading(false)
        }

        getRaceName()

        if (finalResult && finalResult.option3 === 'All') {
            router.push(`/result/${finalResult.option2}/${finalResult.option1}`)
        }
    }, [])

    useEffect(() => {
        let url = ''

        switch(finalResult.option2) {
            case 'races':
                url = 'http://localhost:4000/race/get-list-race'
                break
            case 'drivers':
                url = 'http://localhost:4000/all-driver/get-list-driver'
                break
            case 'teams':
                url = 'http://localhost:4000/all-team/get-list-team'
                break
            default:
                break
        }

        if (url) {
            setLoading(true)

            const getData = async () => {
                const res = await axios.get(url, { params: { year: finalResult.option1 } })
                setOptions3(res.data.data.names)
                setLoading(false)
            }

            getData()
        }
    }, [finalResult])

    return (
        <div className='container mx-auto'>
            <div className="grid grid-cols-3 space-x-4">
                <SelectComp defaultVal={defaultOption1} options={optionsYear} handleValue={handleYearChange} />
                <SelectComp defaultVal={defaultOption2} options={options2} handleValue={handleOption2Change} />
                {
                    options3.length !== 0 &&
                    <SelectComp isDisabled={finalResult.option2 === 'dhl' ? true : false} defaultVal={options3[0]} options={options3} handleValue={handleOption3Change} />
                } 
            </div>
        </div>
    )
}