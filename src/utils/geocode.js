const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2hyYTEyMzQ1IiwiYSI6ImNrb2N5cDBkZDA0bDgycW54YWNhM2NwcG8ifQ.pQTe6l5ISLXNms-AVHcU_A&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect with network. Please try again later!' , undefined)
        }else if(body.features.length === 0){
            callback('unable to find the location. Please try another!', undefined)
        }else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports= geocode
