const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=6229b486133e7f274cecb0576f06c74d&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json : true }, (error, {body}) => {
    //const data = JSON.parse(response.body)
    if (error){
        callback('unable to connect with network', undefined)
    }else if(body.error){
        callback('unable to find the location. Please try another!', undefined)
    }
    else{
        callback(undefined, body.current.weather_descriptions+' It is currently '+body.current.temperature +' degrees out. There is ' +body.current.precip+' % chance of rain.Humidity of this place is '+body.current.humidity+'%.')
    }
})
}

module.exports = forecast