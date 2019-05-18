const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const patDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebar engines & views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Set up static directory to serve
app.use(express.static(patDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather look',
        name: 'Shavez'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Cat look',
        name: 'Shavez'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpMesage: 'This is about dynamic help message',
        title: 'Help',
        name: 'Shavez'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address query string'
        });
    }

    geocode(req.query.address, (error, { latitute, longitute, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        debugger
        forecast(latitute, longitute, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search query string'
        });
    }
    res.send({
        products: [] 
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shavez',
        errorMessage: 'Help article not found.'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shavez',
        errorMessage: 'Page not found.'
    })
});

app.listen(2000, () => {
    console.log('Server is up on port 2000')
});