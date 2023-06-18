const cheerio = require('cheerio')
const axios = require('axios')

async function main() { 
    const paginationURLsToVisit = ['https://www.formula1.com/en/results.html/2023/races.html']
    const visitedURLs = []
    
    const raceURLs = []
    
    while ( 
		paginationURLsToVisit.length !== 0
	) { 
        // the current webpage to crawl 
		const paginationURL = paginationURLsToVisit.pop()

        // retrieving the HTML content from paginationURL 
		const response = await axios.get(paginationURL)

        // adding the current webpage to the 
		// web pages already crawled 
		visitedURLs.push(paginationURL)

        // initializing cheerio on the current webpage 
		const $ = cheerio.load(response.data)

        // retrieving the product URLs 
		$('.resultsarchive-filter-wrap:nth-child(3) > .resultsarchive-filter.ResultFilterScrollable > .resultsarchive-filter-item > .resultsarchive-filter-item-link').each((index, element) => { 
			const raceURL = $(element).attr("href")
			raceURLs.push('https://www.formula1.com' + raceURL); 
		}); 
    }

    raceURLs.shift()
    // console.log(raceURLs)

    for (url of raceURLs) {
        await getRaceDetail(url)
    }
}

async function getRaceDetail(url) {
    const dURLs = []
    const id = url.split('/')[8]
    const year = url.split('/')[5]
    
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    $('.resultsarchive-col-left > .resultsarchive-side-nav > .side-nav-item > .side-nav-item-link').each((index, element) => {
        const URL = $(element).attr('href')
        dURLs.push('https://www.formula1.com' + URL)
    })


    // console.log('url is: ', url)
    // await getRaceResult(dURLs[0], id)
    // await getFastestLap(dURLs[1])
    moreDetail(dURLs, id, year)
}

async function moreDetail(urls, id, year) {
    const raceDetail = {}
    const raceResult = []
    const fastestLap = []
    const pitStop = []
    const statingGrid = []
    const qualifying = []
    const practice3 = []
    const practice2 = []
    const practice1 = []

    if (urls.length !== 0) {
        // id
        raceDetail.id = id
        raceDetail.year = year

        // get race result
        const raceResultRes = await axios.get(urls[0])
        const $ = cheerio.load(raceResultRes.data)
    
        const raceResults = $('tbody tr')
    
        raceResults.each(function() {
            pos = $(this).find('td:nth-child(2)').text()
            no = $(this).find('td:nth-child(3)').text()
            firstname = $(this).find('td:nth-child(4) > span:nth-child(1)').text()
            lastname = $(this).find('td:nth-child(4) > span:nth-child(2)').text()
            car = $(this).find('td:nth-child(5)').text()
            laps = $(this).find('td:nth-child(6)').text()
            time_retired = $(this).find('td:nth-child(7)').text()
            pts = $(this).find('td:nth-child(8)').text()
    
            raceResult.push({ pos, no, firstname, lastname, car, laps, time_retired, pts })
        }) 

        raceDetail.raceResult = raceResult

        // get fastest laps
        const fastestLapRes = await axios.get(urls[1])
        const $$ = cheerio.load(fastestLapRes.data)
    
        const fastestLaps = $$('tbody tr')
    
        fastestLaps.each(function() {
            pos = $$(this).find('td:nth-child(2)').text()
            no = $$(this).find('td:nth-child(3)').text()
            firstname = $$(this).find('td:nth-child(4) > span:nth-child(1)').text()
            lastname = $$(this).find('td:nth-child(4) > span:nth-child(2)').text()
            car = $$(this).find('td:nth-child(5)').text()
            laps = $$(this).find('td:nth-child(6)').text()
            time_of_day = $$(this).find('td:nth-child(7)').text()
            time = $$(this).find('td:nth-child(8)').text()
            avg_speed = $$(this).find('td:nth-child(9)').text()
    
            fastestLap.push({ pos, no, firstname, lastname, car, laps, time_of_day, time, avg_speed })
        }) 

        raceDetail.fastestLap = fastestLap

        // get pit stop summary
        const pitStopRes = await axios.get(urls[2])
        const $$$ = cheerio.load(pitStopRes.data)

        const pitStops = $$$('tbody tr')

        pitStops.each(function() {
            stopp = $$$(this).find('td:nth-child(2)').text()
            no = $$$(this).find('td:nth-child(3)').text()
            firstname = $$$(this).find('td:nth-child(4) > span:nth-child(1)').text()
            lastname = $$$(this).find('td:nth-child(4) > span:nth-child(2)').text()
            car = $$$(this).find('td:nth-child(5)').text()
            laps = $$$(this).find('td:nth-child(6)').text()
            time_of_day = $$$(this).find('td:nth-child(7)').text()
            time = $$$(this).find('td:nth-child(8)').text()
            total = $$$(this).find('td:nth-child(9)').text()

            pitStop.push({ stopp, no, firstname, lastname, car, laps, time_of_day, time, total })
        })

        raceDetail.pitStop = pitStop

        // get starting grid
        const startingGridRes = await axios.get(urls[3])
        const $$$$ = cheerio.load(startingGridRes.data)

        const startingGrids = $$$$('tbody tr')

        startingGrids.each(function() {
            pos = $$$$(this).find('td:nth-child(2)').text()
            no = $$$$(this).find('td:nth-child(3)').text()
            firstname = $$$$(this).find('td:nth-child(4) > span:nth-child(1)').text()
            lastname = $$$$(this).find('td:nth-child(4) > span:nth-child(2)').text()
            car = $$$$(this).find('td:nth-child(5)').text()
            time = $$$$(this).find('td:nth-child(6)').text()

            statingGrid.push({ pos, no, firstname, lastname, car, time })
        })

        raceDetail.statingGrid = statingGrid

        // get qualifying
        const qualifyingRes = await axios.get(urls[4])
        const $$$$$ = cheerio.load(qualifyingRes.data)

        const qualifyings = $$$$$('tbody tr')

        qualifyings.each(function() {
            pos = $$$$$(this).find('td:nth-child(2)').text()
            no = $$$$$(this).find('td:nth-child(3)').text()
            firstname = $$$$$(this).find('td:nth-child(4) > span:nth-child(1)').text()
            lastname = $$$$$(this).find('td:nth-child(4) > span:nth-child(2)').text()
            car = $$$$$(this).find('td:nth-child(5)').text()
            q1 = $$$$$(this).find('td:nth-child(6)').text()
            q2 = $$$$$(this).find('td:nth-child(7)').text()
            q3 = $$$$$(this).find('td:nth-child(8)').text()
            laps = $$$$$(this).find('td:nth-child(9)').text()

            qualifying.push({ pos, no, firstname, lastname, car, q1, q2, q3, laps })
        })

        raceDetail.qualifying = qualifying

        // get practice 3
        const practice3Res = await axios.get(urls[5])
        const $$$$$$ = cheerio.load(practice3Res.data)

        const practice3s = $$$$$$('tbody tr')

        practice3s.each(function() {
            pos = $$$$$$(this).find('td:nth-child(2)').text()
            no = $$$$$$(this).find('td:nth-child(3)').text()
            firstname = $$$$$$(this).find('td:nth-child(4) > span:nth-child(1)').text()
            lastname = $$$$$$(this).find('td:nth-child(4) > span:nth-child(2)').text()
            car = $$$$$$(this).find('td:nth-child(5)').text()
            time = $$$$$$(this).find('td:nth-child(6)').text()
            gap = $$$$$$(this).find('td:nth-child(7)').text()
            laps = $$$$$$(this).find('td:nth-child(8)').text()

            practice3.push({ pos, no, firstname, lastname, car, time, gap, laps })
        })

        raceDetail.pratice3 = practice3

        // get practice 2
        const practice2Res = await axios.get(urls[6])
        const $$$$$$$ = cheerio.load(practice2Res.data)

        const practice2s = $$$$$$$('tbody tr')

        practice2s.each(function() {
            pos = $$$$$$$(this).find('td:nth-child(2)').text()
            no = $$$$$$$(this).find('td:nth-child(3)').text()
            firstname = $$$$$$$(this).find('td:nth-child(4) > span:nth-child(1)').text()
            lastname = $$$$$$$(this).find('td:nth-child(4) > span:nth-child(2)').text()
            car = $$$$$$$(this).find('td:nth-child(5)').text()
            time = $$$$$$$(this).find('td:nth-child(6)').text()
            gap = $$$$$$$(this).find('td:nth-child(7)').text()
            laps = $$$$$$$(this).find('td:nth-child(8)').text()

            practice2.push({ pos, no, firstname, lastname, car, time, gap, laps })
        })

        raceDetail.pratice2 = practice2

        // get practice 1
        const practice1Res = await axios.get(urls[7])
        const $$$$$$$$ = cheerio.load(practice1Res.data)

        const practice1s = $$$$$$$$('tbody tr')

        practice1s.each(function() {
            pos = $$$$$$$$(this).find('td:nth-child(2)').text()
            no = $$$$$$$$(this).find('td:nth-child(3)').text()
            firstname = $$$$$$$$(this).find('td:nth-child(4) > span:nth-child(1)').text()
            lastname = $$$$$$$$(this).find('td:nth-child(4) > span:nth-child(2)').text()
            car = $$$$$$$$(this).find('td:nth-child(5)').text()
            time = $$$$$$$$(this).find('td:nth-child(6)').text()
            gap = $$$$$$$$(this).find('td:nth-child(7)').text()
            laps = $$$$$$$$(this).find('td:nth-child(8)').text()

            practice1.push({ pos, no, firstname, lastname, car, time, gap, laps })
        })

        raceDetail.practice1 = practice1
    }

    raceDetail.id = id
    raceDetail.year = year

    // final result
    console.log('raceDetail', JSON.stringify(raceDetail));
}

main()
    .then(() => { 
        // successful ending 
        process.exit(0); 
    }) 
    .catch((e) => { 
        // logging the error message 
        console.error(e); 

        // unsuccessful ending 
        process.exit(1); 
    });