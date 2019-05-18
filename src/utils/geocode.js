const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2hhdmV6MDEiLCJhIjoiY2p2cWVnN2h5MDgybTRhbWFnMWh6aGFxbCJ9.V_GcBvupG02hxTG6jZrg4A`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect location service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location!. Try another search', undefined);
        } else {
            callback(undefined, {
                latitute: body.features[0].center[0],
                longitute: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;