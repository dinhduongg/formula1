const cheerio = require('cheerio')
const axios = require('axios')
const j2cp = require('json2csv').Parser
const fs = require('fs')

const raceUrl = 'https://www.formula1.com/en/results.html/2023/races.html'

const race = {}
const current = new Date().getFullYear()

async function getRace(jump) {
    try {
        for (var i = 0; i < jump; i++) {
            const races_data = []
            const names = []

            const url = `https://www.formula1.com/en/results.html/${current - i}/races.html`

            const year = url.split('/')[5]
    
            const response = await axios.get(url)
            const $ = cheerio.load(response.data)
    
            const races = $('tbody tr')
            races.each(function() {
                prix = $(this).find('td a').text().trim()
                date = $(this).find('.dark.hide-for-mobile').text()
                firstname = $(this).find('.dark.bold > span:nth-child(1)').text()
                lastname = $(this).find('.dark.bold > span:nth-child(2)').text()
                car = $(this).find('.semi-bold.uppercase').text()
                laps = $(this).find('.bold.hide-for-mobile').text()
                time = $(this).find('.dark.bold.hide-for-tablet').text()
    
                races_data.push({ prix, date, firstname, lastname, car, laps, time })
            })
            
            const aa = $('div.resultsarchive-filter-wrap:nth-child(3) > ul:nth-child(1) > li')
            aa.each(function() {
                const race_name = $(this).find('a:nth-child(1) > span:nth-child(1)').text()

                names.push({ value: race_name, label: race_name })
            })
    
            race.year = year
            race.races = races_data
            race.names = names
    
            // done
            // console.log(race)
            await axios.post('http://localhost:4000/race/add-list', race)
                .then(response => console.log(response.data.message + ` - ${i + 1} time`))
                .catch(error => console.log('error'))
        }
    } catch (error) {
        console.log(error)
    }
}

getRace(50)