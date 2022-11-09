const express = require('express')
const path = require('path')
const hbs = require('hbs')
const checkWeather = require('./utils/checkWeather')
const geocode = require('./utils/geocode')
const app = express()
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//SetUp static directory to use
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:"Welcome to my page",
        name: "Lohitaksh Singla",
        age: 24
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place}={}) => {
        if(error){
            return res.send({error})
        }

        checkWeather(latitude, longitude, (error, forcastWeatherData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forcast: forcastWeatherData,
                location: place,
                address: req.query.address
            })
        })

      
    })
    
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Lohitaksh Singla"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some helpful Text",
        title: "Help",
        name: "Lohitaksh Singla"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Help",
        name: "Lohitaksh Singla",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: "Lohitaksh Singla",
        errorMessage: "Page not found..."
    })
})

app.listen(port, () => {
    console.log("Server is up on server " + port)
})