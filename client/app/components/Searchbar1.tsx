'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getOptions1, getOptions2, getOptions3 } from '@/lib/utils'
import SelectComp from './Select'

type finalResult = {
    option1: string
    option2: string
    option3: string
}

export default function Searchbar1() {
    const router = useRouter()
    const params = useParams()

    const currentYear = new Date().getFullYear()

    const options1 = getOptions1()
    const options2 = getOptions2()

    const [options3, setOptions3] = useState<any[]>([])
    const [value, setValue] = useState<{value: string, label: string} | null>(null)
    const [finalResult, setFinalResult] = useState<finalResult>({ option1: currentYear.toString(), option2: 'races', option3: 'All' })

    const handleYearChange = (value: string) => {
        setFinalResult((prev) => ({
            ...prev,
            option1: value,
        }))

        setOptions3([])

        router.push(`/result/${finalResult.option2}/${value}`)
    }
    
    const handleOption2Change = (value: string) => {
        setFinalResult((prev) => ({
            ...prev,
            option2: value,
        }))

        setOptions3([])
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
        const go3 = async () => {
            const o3 = await getOptions3(finalResult)
            setOptions3(o3)
        }

        go3()
    }, [finalResult])

    useEffect(() => {
        router.push(`/result/${finalResult.option2}/${finalResult.option1}`)
    }, [])

    return (
        <div className='container mx-auto'>
            <div className="grid grid-cols-3 space-x-4">
                <SelectComp defaultVal={options1[0]} options={options1} handleValue={handleYearChange} />
                <SelectComp defaultVal={options2[0]} value={options2[options2.findIndex(o2 => { return o2.value.toLowerCase() === finalResult.option2.toLowerCase() })]} options={options2} handleValue={handleOption2Change} />
                {   options3?.length !== 0 &&
                    <SelectComp isDisabled={finalResult.option2 === 'dhl' ? true : false} defaultVal={options3?.[0]} options={options3} handleValue={handleOption3Change} />
                }
            </div>
        </div>
    )
}