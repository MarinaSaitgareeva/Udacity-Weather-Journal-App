// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware */
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
};

// Initialize all route with a callback function
app.post('/add', callback);

function callback (req, res) {
  res.send('POST received');
};

// Callback function to complete GET '/all'
app.get('/all', sendData);

function sendData(req, res) {
  res.send(projectData);
};

// Post Route
app.post('/weather', addWeather);

function addWeather(req, res) {
  projectData.temrerature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;
  res.end();
  console.log(projectData);
};