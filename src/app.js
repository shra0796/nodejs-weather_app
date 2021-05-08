const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shraboni Chakraborty'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title : 'About Me',
        name: 'Shraboni Chakraborty'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title : 'Help',
        name: 'Shraboni Chakraborty'
    })
})
const location = process.argv[2]

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            errror : 'You must provide a address!'
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location} ={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastdata,
                location,
                address : req.query.address
            })
        })
    })   
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term!'
        })
    }

    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error' , {
        title : "Page not exists",
        name : 'Shraboni Chakraborty',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404' , {
        title : 'My 404 page',
        name : 'Shraboni Chakraborty',
        errorMessage : 'page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})