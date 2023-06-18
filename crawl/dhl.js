const cheerio = require('cheerio')
const axios = require('axios')

const dhlURL = 'https://www.formula1.com/en/results.html/2022/fastest-laps.html'

const currentYear = new Date().getFullYear()
const dhl = {}

async function getDhl(jump) {
    try {
        for (var i = 0; i < jump; i++) {
            
            const dhl_data = []

            const url = `https://www.formula1.com/en/results.html/${currentYear - i}/fastest-laps.html`

            const year = url.split('/')[5]

            const response = await axios.get(url)
            const $ = cheerio.load(response.data)

            const desc = $('.resultsarchive-content-header')
            desc.each(function() {
                winner = $(this).find('.resultsarchive-dhl-winner > p:nth-child(2)').text().replace((/  |\r\n|\n|\r/gm),"").replace('(', ' (').replace(')', ') - ')
                
                dhl.winner = winner
            })

            const dhls = $('tbody tr')
            dhls.each(function() {
                grandPrix = $(this).find('td:nth-child(2)').text().trim()
                firstname = $(this).find('td:nth-child(3) > span:nth-child(1)').text()
                lastname = $(this).find('td:nth-child(3) > span:nth-child(2)').text()
                car = $(this).find('td:nth-child(4)').text()
                time = $(this).find('td:nth-child(5)').text().trim()
    
                dhl_data.push({ grandPrix, firstname, lastname, car, time })
            })

            dhl.year = year
            dhl.dhlDetail = dhl_data
    
            // done
            // console.log('------------------------->')
            // console.log(dhl)
            await axios.post('http://localhost:4000/dhl/add-dhl', dhl)
                .then(response => console.log(response.data.message + ` - ${i + 1} time(s)`))
                .catch(error => console.log('error'))
        }
    } catch (error) {
        console.log(error)
    }
}

getDhl(50)