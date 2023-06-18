const cheerio = require('cheerio')
const axios = require('axios')

const driver = {}
const paginationURLsToVisit = ['https://www.formula1.com/en/results.html/2023/drivers.html']
const current = new Date().getFullYear() 

async function main(jump) {
    for (var i = 0; i < jump; i++) {
        var driverURLs = []

        const url = `https://www.formula1.com/en/results.html/${current - i}/drivers.html`
        
		const response = await axios.get(url)
        const $ = cheerio.load(response.data)

        $('div.resultsarchive-filter-wrap:nth-child(3) > ul > li > a').each(async (index, element) => { 
            const raceURL = $(element).attr("href")
            if (raceURL !== `/en/results.html/${current - i}/drivers.html`) {
                await getDriverDetail(`https://www.formula1.com${raceURL}`)
                // driverURLs.push('https://www.formula1.com' + raceURL); 
            }
		})
    }
}

async function getDriverDetail(url) {
    const driverDetail = []

    const year = url.split('/')[5]

    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    const name = $('.resultsarchive-content-header')
    name.each(function() {
        fullname = $(this).find('.ResultsArchiveTitle').text().trim()

        driver.year = year
        driver.lastname = fullname.split(':')[1].split(' ')[2]
        driver.firstname = fullname.split(':')[1].split(' ')[1]
    })

    const details = $('.resultsarchive-table > tbody > tr')
    details.each(function() {
        grandPrix = $(this).find('td:nth-child(2) > a:nth-child(1)').text().trim()
        date = $(this).find('td:nth-child(3)').text().trim()
        car = $(this).find('td:nth-child(4) > a').text().trim()
        racePosition = $(this).find('td:nth-child(5)').text().trim()
        point = $(this).find('td:nth-child(6)').text().trim()

        driverDetail.push({ grandPrix, date, car, racePosition, point })
    })

    const avg_point = driverDetail.reduce((total, next) => total + Number(next.point), 0) / driverDetail.length

    driver.avg_point = avg_point.toFixed(2)
    driver.driverDetail = driverDetail

    // done
    // console.log(driver)
    await axios.post('http://localhost:4000/driver/add', driver)
        .then(response => console.log(response.data))
        .catch(error => console.log(driver))
} 

main(50)