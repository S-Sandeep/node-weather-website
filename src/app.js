const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Sandeep S'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About My Life',
        name:'Sandeep S'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        msg:'How , May i Help You ??',
        name:'Sandeep S'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
      return res.send({
          error:'you must provide an address'
      })
    } else {
        // destructring by adding an empty parantheses on line 50 when we pass an empty address  
        geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
            if(error){
                return res.send({
                    error
                })
            }
            forecast(latitude,longitude, (error, forecastData) => {
                if(error){
                    return res.send({ error })
                }
                 res.send({
                    address: req.query.address,
                    forecastData:forecastData,
                    location,
                })
              })
        })
    }
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title:'404',
        name:'Sandeep S',
        errorMsg:'Help Article not Found'
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        title:'404',
        name:'Sandeep S',
        errorMsg:'Page Not Found'
    })
})

app.listen(3000,() => {
    console.log('server up running at port 3000')
})