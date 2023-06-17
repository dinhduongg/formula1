import axios from "axios"

export const getOptions1 = () => {
    const currentYear = new Date().getFullYear()
    const op1 = []

    for (var i =0; i < 50; i++) {
        const year = {
            value: (currentYear - i).toString(),
            label: (currentYear - i).toString()
        }

        op1.push(year)
    }

    return op1
}

export const getOptions2 = () => {
    const options2 = [
        { value: 'races', label: 'races' },
        { value: 'drivers', label: 'drivers' },
        { value: 'teams', label: 'teams' },
        { value: 'dhl', label: 'dhl fastest lap award' }
    ]

    return options2
}

type finalResult = {
    option1: string
    option2: string
    option3: string
}

export const getOptions3 =  async (finalResult: finalResult) => {
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

    if (!url) {
        return
    }

    const res = await axios.get(url, { params: { year: finalResult.option1 } })
    return res.data.data.names
}

export const options3Index = (finalResult: finalResult, options3: any) => {
    const index = options3.findIndex((op: any) => {
        return op.value.toLowerCase() === finalResult.option3.trim().replaceAll('-', ' ').toLowerCase()
    })
    
    return index
}