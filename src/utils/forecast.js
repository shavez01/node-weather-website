const request = require('request');

const forecast = (latitute, longitute, callback) => {
    const url = `https://api.darksky.net/forecast/7618faccb298982c3a35794fa2c748b8/${latitute},${longitute}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is Currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} % chance of rain`);
        }
    });
}

module.exports = forecast;