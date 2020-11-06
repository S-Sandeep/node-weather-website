const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://darksky.net/forecast/' + latitude+ ',' + longitude + '/us12/en.json'

    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to get Weather Service!',undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out . '+ 'there is a ' + body.currently.precipProbability+ ' %chance of Rain .')
        }
    })
}

module.exports = forecast