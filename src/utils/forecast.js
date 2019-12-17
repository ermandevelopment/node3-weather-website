const request = require('request')


const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/601866d3c167353f338cff140400fd56/" + lat + "," + long + "?lang=tr"

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (response.body.error) {
            console.log("Unable to find location")
        } else {
            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature,
                precipProbability: response.body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast