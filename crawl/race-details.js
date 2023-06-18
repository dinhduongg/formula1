const cheerio = require('cheerio')
const axios = require('axios')

const raceResultURL = 'https://www.formula1.com/en/results.html/2023/races/1141/bahrain/race-result.html'
const fastestLapURL = 'https://www.formula1.com/en/results.html/2023/races/1141/bahrain/fastest-laps.html'
const pitStopSummaryURL = 'https://www.formula1.com/en/results.html/2023/races/1141/bahrain/pit-stop-summary.html'
const startingGridURL = 'https://www.formula1.com/en/results.html/2023/races/1207/azerbaijan/starting-grid.html'
const qualifyingURL = 'https://www.formula1.com/en/results.html/2023/races/1210/monaco/qualifying.html'
const practice3URL = 'https://www.formula1.com/en/results.html/2023/races/1210/monaco/practice-3.html'
const practice2URL = 'https://www.formula1.com/en/results.html/2023/races/1141/bahrain/practice-2.html'
const practice1URL = 'https://www.formula1.com/en/results.html/2023/races/1143/australia/practice-1.html'
const currentYear = new Date().getFullYear()

async function main(jump) {
    for (var i = 0; i < jump; i++) {
        const url = `https://www.formula1.com/en/results.html/${currentYear - i}/races.html`

        const response = await axios.get(url)
        const $ = cheerio.load(response.data)

        $('div.resultsarchive-filter-wrap:nth-child(3) > ul:nth-child(1) > li > a').each(async (index, element) => {
            const raceDetailURL = $(element).attr('href')
            if (raceDetailURL !== `/en/results.html/${currentYear - i}/races.html`) {
                const year = raceDetailURL.split('/')[3]
                const raceID = raceDetailURL.split('/')[5]
                const countryName = raceDetailURL.split('/')[6]
                // await getRaceResult(year, raceID, countryName)
                // await getFastestLaps(year, raceID, countryName)
                // await getPitStopSummary(year, raceID, countryName)
                // await getStaringGrid(year, raceID, countryName)
                // await getQualifying(year, raceID, countryName)
                // await getPractice3(year, raceID, countryName)
                // await getPractice2(year, raceID, countryName)
                await getPractice1(year, raceID, countryName)
            }
        })
    }
}

// race result
async function getRaceResult(year, raceID, countryName) {
    const url = `https://www.formula1.com/en/results.html/${year}/races/${raceID}/${countryName}/race-result.html`

    // console.log('----------------------------------------')
    // console.log(url)

    const raceResultDetail = []
    const raceResult = {}

    raceResult.countryName = countryName
    raceResult.year = year

    const res = await axios.get(url)
    const $ = cheerio.load(res.data)

    const table = $('.resultsarchive-col-right > .resultsarchive-table > tbody > tr')

    table.each(function() {
        pos = $(this).find('td:nth-child(2)').text()
        no = $(this).find('td:nth-child(3)').text()
        firstname = $(this).find('td:nth-child(4) > span:nth-child(1)').text()
        lastname = $(this).find('td:nth-child(4) > span:nth-child(2)').text()
        car = $(this).find('td:nth-child(5)').text()
        laps = $(this).find('td:nth-child(6)').text()
        time_retired = $(this).find('td:nth-child(7)').text()
        point = $(this).find('td:nth-child(8)').text()

        raceResultDetail.push({ pos, no, firstname, lastname, car, laps, time_retired, point })
    })

    raceResult.raceResultDetail = raceResultDetail

    // console.log('--------------------raceResult--------------------')
    // console.log(raceResult);

    await axios.post('http://localhost:4000/race/add-race-result', raceResult)
        .then(res => console.log(res.data.message))
        .catch(error => console.log(error))
}

// fastest lap
async function getFastestLaps(year, raceID, countryName) {
    const url = `https://www.formula1.com/en/results.html/${year}/races/${raceID}/${countryName}/fastest-laps.html`

    // console.log('----------------------------------------')
    // console.log(url)

    const fastestLapDetail = []
    const fastestLap = {}

    fastestLap.year = year
    fastestLap.countryName = countryName

    const res = await axios.get(url)
    const $ = cheerio.load(res.data)

    const table = $('.resultsarchive-col-right > .resultsarchive-table > tbody > tr')

    table.each(function() {
        pos = $(this).find('td:nth-child(2)').text()
        no = $(this).find('td:nth-child(3)').text()
        firstname = $(this).find('td:nth-child(4) > span:nth-child(1)').text()
        lastname = $(this).find('td:nth-child(4) > span:nth-child(2)').text()
        car = $(this).find('td:nth-child(5)').text()
        lap = $(this).find('td:nth-child(6)').text()
        time_of_day = $(this).find('td:nth-child(7)').text()
        time = $(this).find('td:nth-child(8)').text()
        avg_speed = $(this).find('td:nth-child(9)').text()

        fastestLapDetail.push({ pos, no, firstname, lastname, car, lap, time_of_day, time, avg_speed })
    })

    fastestLap.fastestLapDetail = fastestLapDetail

    // console.log('----------------------------------------')
    // console.log(fastestLap);

    await axios.post('http://localhost:4000/race/add-fastest-lap', fastestLap)
        .then(res => console.log(res.data.message))
        .catch(error => console.log(error))
}

// pit stop summary
async function getPitStopSummary(year, raceID, countryName) {
    const url = `https://www.formula1.com/en/results.html/${year}/races/${raceID}/${countryName}/pit-stop-summary.html`

    // console.log('----------------------------------------')
    // console.log(url)

    const pitStopSummaryDetail = []
    const pitStopSummary = {}

    pitStopSummary.countryName = countryName
    pitStopSummary.year = year

    const res = await axios.get(url)
    const $ = cheerio.load(res.data)

    const table = $('.resultsarchive-col-right > .resultsarchive-table > tbody > tr')

    table.each(function () {
        stops = $(this).find('td:nth-child(2)').text()
        no = $(this).find('td:nth-child(3)').text()
        firstname = $(this).find('td:nth-child(4) > span:nth-child(1)').text()
        lastname = $(this).find('td:nth-child(4) > span:nth-child(2)').text()
        car = $(this).find('td:nth-child(5)').text()
        laps = $(this).find('td:nth-child(6)').text()
        time_of_day = $(this).find('td:nth-child(7)').text()
        time = $(this).find('td:nth-child(8)').text()
        total = $(this).find('td:nth-child(9)').text()

        pitStopSummaryDetail.push({ stops, no, firstname, lastname, car, laps, time_of_day, time, total })
    })

    pitStopSummary.pitStopSummaryDetail = pitStopSummaryDetail

    // console.log('pitStopSummary ----------------------------------------')
    // console.log(pitStopSummary)

    await axios.post('http://localhost:4000/race/add-pit-stop', pitStopSummary)
        .then(res => console.log(res.data.message))
        .catch(error => console.log(error))
}

// starting grid
async function getStaringGrid(year, raceID, countryName) {
    const url = `https://www.formula1.com/en/results.html/${year}/races/${raceID}/${countryName}/starting-grid.html`

    // console.log('----------------------------------------')
    // console.log(url)

    const startingGridDetail = []
    const startingGrid = {}

    startingGrid.countryName = countryName
    startingGrid.year = year

    const res = await axios.get(url)
    const $ = cheerio.load(res.data)

    const table = $('.resultsarchive-col-right > .resultsarchive-table > tbody > tr')

    table.each(function() {
        pos = $(this).find('td:nth-child(2)').text()
        no = $(this).find('td:nth-child(3)').text()
        firstname = $(this).find('td:nth-child(4) > span:nth-child(1)').text()
        lastname = $(this).find('td:nth-child(4) > span:nth-child(2)').text()
        car = $(this).find('td:nth-child(5)').text()
        time = $(this).find('td:nth-child(6)').text()

        startingGridDetail.push({ pos, no, firstname, lastname, car, time })
    })

    startingGrid.startingGridDetail = startingGridDetail

    // console.log('---------------------------------------- startingGrid')
    // console.log(startingGrid)

    await axios.post('http://localhost:4000/race/add-starting-grid', startingGrid)
        .then(res => console.log(res.data.message))
        .catch(error => console.log(error))
}

async function getQualifying(year, raceID, countryName) {
    const url = `https://www.formula1.com/en/results.html/${year}/races/${raceID}/${countryName}/qualifying.html`

    // console.log('----------------------------------------')
    // console.log(url)

    const qualifyingDetail = []
    const qualifying = {}

    qualifying.countryName = countryName
    qualifying.year = year

    const res = await axios.get(url)
    const $ = cheerio.load(res.data)

    const table = $('.resultsarchive-col-right > .resultsarchive-table > tbody > tr')

    table.each(function() {
        pos = $(this).find('td:nth-child(2)').text()
        no = $(this).find('td:nth-child(3)').text()
        firstname = $(this).find('td:nth-child(4) > span:nth-child(1)').text()
        lastname = $(this).find('td:nth-child(4) > span:nth-child(2)').text()
        car = $(this).find('td:nth-child(5)').text()
        q1 = $(this).find('td:nth-child(6)').text()
        q2 = $(this).find('td:nth-child(7)').text()
        q3 = $(this).find('td:nth-child(8)').text()
        laps = $(this).find('td:nth-child(9)').text()

        qualifyingDetail.push({ pos, no, firstname, lastname, car, q1, q2, q3, laps })
    })

    qualifying.qualifyingDetail = qualifyingDetail

    // console.log('---------------------------------------- qualifying')
    // console.log(qualifying)

    await axios.post('http://localhost:4000/race/add-qualifying', qualifying)
        .then(res => console.log(res.data.message))
        .catch(error => console.log(error))
}

async function getPractice3(year, raceID, countryName) {
    const url = `https://www.formula1.com/en/results.html/${year}/races/${raceID}/${countryName}/practice-3.html`

    // console.log('----------------------------------------')
    // console.log(url)

    const practiceDetail = []
    const practice3 = {}

    practice3.countryName = countryName
    practice3.year = year

    const res = await axios.get(url)
    const $ = cheerio.load(res.data)

    const table = $('.resultsarchive-col-right > .resultsarchive-table > tbody > tr')

    table.each(function() {
        pos = $(this).find('td:nth-child(2)').text()
        no = $(this).find('td:nth-child(3)').text()
        firstname = $(this).find('td:nth-child(4) > span:nth-child(1)').text()
        lastname = $(this).find('td:nth-child(4) > span:nth-child(2)').text()
        car = $(this).find('td:nth-child(5)').text()
        time = $(this).find('td:nth-child(6)').text()
        gap = $(this).find('td:nth-child(7)').text()
        laps = $(this).find('td:nth-child(8)').text()

        practiceDetail.push({ pos, no, firstname, lastname, car, time, gap, laps })
    })

    practice3.practiceDetail = practiceDetail

    // console.log('---------------------------------------- practice3')
    // console.log(practice3)

    await axios.post('http://localhost:4000/race/add-practice3', practice3)
        .then(res => console.log(res.data.message))
        .catch(error => console.log(error))
}

async function getPractice2(year, raceID, countryName) {
    const url = `https://www.formula1.com/en/results.html/${year}/races/${raceID}/${countryName}/practice-2.html`

    // console.log('----------------------------------------')
    // console.log(url)

    const practiceDetail = []
    const practice2 = {}

    practice2.countryName = countryName
    practice2.year = year

    const res = await axios.get(url)
    const $ = cheerio.load(res.data)

    const table = $('.resultsarchive-col-right > .resultsarchive-table > tbody > tr')

    table.each(function() {
        pos = $(this).find('td:nth-child(2)').text()
        no = $(this).find('td:nth-child(3)').text()
        firstname = $(this).find('td:nth-child(4) > span:nth-child(1)').text()
        lastname = $(this).find('td:nth-child(4) > span:nth-child(2)').text()
        car = $(this).find('td:nth-child(5)').text()
        time = $(this).find('td:nth-child(6)').text()
        gap = $(this).find('td:nth-child(7)').text()
        laps = $(this).find('td:nth-child(8)').text()

        practiceDetail.push({ pos, no, firstname, lastname, car, time, gap, laps })
    })

    practice2.practiceDetail = practiceDetail

    // console.log('---------------------------------------- practice2')
    // console.log(practice2)

    await axios.post('http://localhost:4000/race/add-practice2', practice2)
        .then(res => console.log(res.data.message))
        .catch(error => console.log(error))
}

async function getPractice1(year, raceID, countryName) {
    const url = `https://www.formula1.com/en/results.html/${year}/races/${raceID}/${countryName}/practice-1.html`

    // console.log('----------------------------------------')
    // console.log(url)

    const practiceDetail = []
    const practice1 = {}

    practice1.countryName = countryName
    practice1.year = year

    const res = await axios.get(url)
    const $ = cheerio.load(res.data)

    const table = $('.resultsarchive-col-right > .resultsarchive-table > tbody > tr')

    table.each(function() {
        pos = $(this).find('td:nth-child(2)').text()
        no = $(this).find('td:nth-child(3)').text()
        firstname = $(this).find('td:nth-child(4) > span:nth-child(1)').text()
        lastname = $(this).find('td:nth-child(4) > span:nth-child(2)').text()
        car = $(this).find('td:nth-child(5)').text()
        time = $(this).find('td:nth-child(6)').text()
        gap = $(this).find('td:nth-child(7)').text()
        laps = $(this).find('td:nth-child(8)').text()

        practiceDetail.push({ pos, no, firstname, lastname, car, time, gap, laps })
    })

    practice1.practiceDetail = practiceDetail

    // console.log('---------------------------------------- practice1')
    // console.log(practice1)

    await axios.post('http://localhost:4000/race/add-practice1', practice1)
        .then(res => console.log(res.data.message))
        .catch(error => console.log(error))
}

main(50)