const cheerio = require('cheerio')
const axios = require('axios')

const teamURL = 'https://www.formula1.com/en/results.html/2023/team.html'

const team = {}
const current = new Date().getFullYear()

async function getTeam(jump) {
    try {
        for (var i = 0; i < jump; i++) {
            const team_data = []
            const names = [{value: 'All', label: 'All'}]

            const url = `https://www.formula1.com/en/results.html/${current - i}/team.html`

            const year = url.split('/')[5]
    
            const response = await axios.get(url)
            const $ = cheerio.load(response.data)
    
            const teams = $('tbody tr')
            teams.each(function() {
                pos = $(this).find('td:nth-child(2)').text().trim()
                team_name = $(this).find('td:nth-child(3)').text().trim()
                point = $(this).find('td:nth-child(4)').text().trim()
    
                team_data.push({ pos, team_name, point })
                names.push({ value: team_name, label: team_name })
            })
    
            team.year = year
            team.teams = team_data
            team.names = names
    
            // done
            // console.log(team)
            await axios.post('http://localhost:4000/all-team/add-list', team)
                .then(response => console.log(response.data.message + ` - ${i + 1} time`))
                .catch(error => console.log('error'))
        }
    } catch (error) {
        console.log(error)
    }
}

getTeam(50)