require('dotenv').config()
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3002

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Narasimha'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Narasimha'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help yourself when needed!',
    title: 'Help',
    name: 'Narasimha'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address term'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({error: forecastError})
      }
      const weather = {
        forecast: forecastData,
        location: location,
        address: req.query.address,
      }
      res.send(weather)
    })
  })
  
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404',{
    errorMessage: 'Help article not found',
    title: '404',
    name: 'Narasimha'  
  })
})

app.get('*', (req, res) => {
  res.render('404',{
    errorMessage: 'Page not found',
    title: '404',
    name: 'Narasimha'
  })
})

app.listen(port, () => {
  console.log('http://localhost:3002')
})