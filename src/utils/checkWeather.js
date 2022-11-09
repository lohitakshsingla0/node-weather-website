const request = require('postman-request')

const checkWeather = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=35faed123630964d4aa554e07d00e4d5&query=' + longitude + ',-' + latitude + '&units=m'
    request({url, json : true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to network", undefined)
        }
        else if(body.error){
            callback('Try changing input', undefined)
        }
        else{
            callback(undefined, {
                Weather : body.current.weather_descriptions[0],
                Temperature: body.current.temperature,
                FeelsLike: body.current.feelslike
            })
        }
    } )

}
module.exports = checkWeather