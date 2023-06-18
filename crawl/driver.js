const cheerio = require('cheerio')
const axios = require('axios')

const driverURL = 'https://www.formula1.com/en/results.html/2022/drivers.html'

const driver = {}
const current = new Date().getFullYear()

async function getDriver(jump) {
    try {
        for (var i = 0; i < jump; i ++) {
            const driver_data = []
            const names = [{value: 'All', label: 'All'}]

            const url = `https://www.formula1.com/en/results.html/${current - i}/drivers.html`

            const year = url.split('/')[5]
    
            const response = await axios.get(url)
            const $ = cheerio.load(response.data)
    
            const drivers = $('tbody tr')
            drivers.each(function() {
                pos = $(this).find('td:nth-child(2)').text().trim()
                firstname = $(this).find('td:nth-child(3) > a >span:nth-child(1)').text()
                lastname = $(this).find('td:nth-child(3) > a > span:nth-child(2)').text()
                nationality = $(this).find('td:nth-child(4)').text()
                car = $(this).find('td:nth-child(5)').text().trim()
                point = $(this).find('td:nth-child(6)').text()
    
                driver_data.push({ pos, firstname, lastname, nationality, car, point })
                names.push({ value: lastname + ', ' + firstname, label: lastname + ', ' + firstname })
            })
    
            driver.year = year
            driver.drivers = driver_data
            driver.names = names
    
            // done
            // console.log(driver)
            await axios.post('http://localhost:4000/all-driver/add-list', driver)
                .then(response => console.log(response.data.message + ` - ${i + 1} time`))
                .catch(error => console.log(error))
        }

    } catch (error) {
        console.log(error)
    }
}

getDriver(50)