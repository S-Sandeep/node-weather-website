const request = require('request')

const geocode = (address,callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FuZGVlcHN1cmVzaCIsImEiOiJja2V3cnJla2sxMTNtMnJtZW5qczA0emZnIn0.KEj6Io8ivz7G2UOjKQBHWA&limit=1'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to get Map service!')
        } else if(body.features.length === 0) {
            callback('Unable to find Location !')
        } else {
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode