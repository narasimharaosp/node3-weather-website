const request = require('request')

const forecast = (lat, long, callback) => {

  const latLong = lat + ',' + long
  const url = 'http://api.weatherstack.com/current?access_key=c63703ea465da524a3b4592a45c1f61e&query='+latLong+'&units=m'

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current
      const msg = weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.'
      callback(undefined, msg)
    }
  })
}

module.exports = forecast