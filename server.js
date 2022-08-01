
//use express to run server and routes, initialize the app
const express = require('express')
const app = express()

//middleware => parse data to be stringfied from json
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false})); // body parser for html post form
app.use(bodyParser.json()); // parse json to normal string

// use cors to allow cross origin
const cors = require('cors');
app.use(cors());

//initialize the main project folder
app.use(express.static('website'))

const port = 5000;
const server = app.listen(5000, () => {console.log(`Server is now running on localhost:${port}`)})


//initialize resData
let resData ={}

//Get Request
app.get('/weather', (req, res) => {
  if(resData) {
    res.send(resData)
  }
})

//Post request
app.post('/weather/display',(req, res) => {
  resData.date = req.body.date;
  resData.temp = req.body.main.temp;
  resData.name = req.body.name;
  resData.feeling = req.body.feeling;
  resData.weather = req.body.weather[0].description

  res.send(resData)
} )