/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'b65ceafe4da0efee89b119906ce559e4';
const addApi = '&units=metric&APPID=';


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */
function performAction(e) {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  
  getWeather(baseURL, zipCode, addApi, apiKey)

    .then(function(data) {
      // Add data to POST request
      postWeather('/addWeather', {date: newDate, temp: data.main.temp, feelings: feelings})

      .then(function(){
        // call updateUI to update browser content
        updateUI();
      });
    });
};


/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipCode, addApi, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL + zipCode + addApi + apiKey);
  try {
    // data equals to the result of fetch function
    const data = await res.json();
    // console.log(data);
    // postWeather('/addWeather', data);
    return data;
  } 
  catch (error) {
    // appropriately handle the error
    console.log('error', error);
  };
};


/* Function to POST data */
const postWeather = async (url = '', data = {}) => {
  // console.log(data);
  const res = await fetch(url, {
    // origin: '*',
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      feelings: data.feelings
    }),
  })

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    // appropriately handle the error
    console.log('error', error);
    }
};


/* Function to GET Project Data */

// Update user interface
const updateUI = async () => {
  const req = await fetch('/all');
  try {
    // Transform into JSON
    const allData = await req.json();
    console.log(allData);
    // Update new entry values
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = `My feelings is ${allData.feelings}`;
  }
  catch (error) {
    // appropriately handle the error
    console.log('error', error);
  }
};