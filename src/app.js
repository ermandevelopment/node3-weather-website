// npm i -y -> initialize npm environment and give yes answer by default
// npm i express@4.16.4 > previous version
// nodemon app.js -e js, hbs -> nodemon also includes hbs to run automatically


// Node path package
const path = require('path')

// import express
const express = require('express')

// initialize express app
const app = express()

// import handlebars hbs for partials
const hbs = require('hbs')

// Get geocode and forecast from another folder
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Get directory and file name
console.log(__dirname)
// path.join is ofr path manipulation
console.log(path.join(__dirname, '../public'))


// Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'templates/views')
const partialPaths = path.join(__dirname, 'templates/partials')

// Setup handlerbars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

// Serve a static html page
app.use(express.static(publicDirectoryPath))

// npm i hbs@4.0.1


// Get hbs index file
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

// Get hbs about file
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

// Get hbs help file
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

// Get weather 
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
             error: 'You must provide an address'
         })
     }


     geocode(req.query.address, (error, {latitude, longitude, location } = {} ) => {
         if (error) {
             return res.send({ error })
         }

         forecast(latitude, longitude, (error, forecastData) => {
             if (error) {
                 return res.send( { error })
             }


             res.send({
                 forecast: forecastData,
                 location,
                 address: req.query.address
             })
         })
     })
})

// Get search term from request -> req.query
// in url, form query ?key=value&key=value
app.get('/products', (req, res) => {

    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not Found'
    })
})

// *(should be the last end point to check) -> any url other than defined in the project
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not Found'
    })
})

// Listen to port and display message when it is up and running
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})


// request test within terminal -> node src/app.js\








































































































