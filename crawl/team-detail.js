const cheerio = require('cheerio')
const axios = require('axios')

const team = {}
const paginationURLsToVisit = ['https://www.formula1.com/en/results.html/2023/team.html']

const current = new Date().getFullYear()

async function main(jump) {
    for (var i = 0; i < jump; i++) {
        const url = `https://www.formula1.com/en/results.html/${current - i}/team.html`

        const response = await axios.get(url)
        const $ = cheerio.load(response.data)

        $('div.resultsarchive-filter-wrap:nth-child(3) > ul > li > a').each(async (index, element) => { 
			const teamURL = $(element).attr("href")
            if (teamURL !== `/en/results.html/${current - i}/team.html`) {
                await getTeamDetail(`https://www.formula1.com${teamURL}`)
            }
		}); 
    } 
    // for (url of teamURLs) {
    //     await getTeamDetail(url)
    // }
}

async function getTeamDetail(url) {
    const teamsDetail = []
    
    const year = url.split('/')[5]

    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    const name = $('.resultsarchive-content-header')
    name.each(function() {
        fullname = $(this).find('.ResultsArchiveTitle').text().trim()

        team.name = fullname.split(':')[1].trim()
    })

    const details = $('tbody tr')
    details.each(function() {
        grandPrix = $(this).find('td:nth-child(2)').text().trim()
        date = $(this).find('td:nth-child(3)').text().trim()
        point = $(this).find('td:nth-child(4)').text().trim()

        teamsDetail.push({ grandPrix, date, point })
    })
    
    team.year = year
    team.teamDetail = teamsDetail

    // done
    // console.log(team)
    await axios.post('http://localhost:4000/team/add', team)
        .then(response => console.log(response.data))
        .catch(error => console.log(driver))
} 

main(50)