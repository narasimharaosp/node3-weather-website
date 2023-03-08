const request = require('request')

const geocode = (address, callback) => {
  address = encodeURIComponent(address)
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token='+process.env.GEOCODE_ACCESS_KEY+'&limit=1'

  request({ url, json: true }, (error, { body: { features } = {} } = {}) => {
    if (error) {
      callback('Unable to connect to location service', undefined)
    } else if (features.length === 0) {
      callback('Unable to find the location. Try another search.', undefined)
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      })
    }
  })
}

module.exports = geocode