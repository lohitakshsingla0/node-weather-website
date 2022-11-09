const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=a0318d5f70a8a1ef490ff1dbb55cfcea&query=' + address
    request({url, json: true}, (error, {body}) =>{ 
        if(error){
            callback("Unable to connect to network", undefined)
        }else if(body.error){
            callback("Try another search", undefined)
        }
        else{
            callback(undefined, { 
                latitude : body.data[0].latitude , 
                longitude : body.data[0].longitude,
                place : body.data[0].label
            })
            }
    })
}


module.exports = geocode