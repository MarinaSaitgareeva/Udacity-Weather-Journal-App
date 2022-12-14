/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'),
curMonth = months[d.getMonth()];
weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
dayOfWeek = weekday[d.getDay()];

let newDate = curMonth + ' ' + d.getDate() + ', ' + d.getFullYear().toString().substr(2) + ' (' + dayOfWeek + ')';

// Personal API Key for OpenWeatherMap API

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'b65ceafe4da0efee89b119906ce559e4';
const addApi = '&units=metric&APPID=';


// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', performAction);


/* Function called by event listener */
function performAction(e) {
  const zipCode = document.querySelector('#zip').value;
  const feelings = document.querySelector('#feelings').value;
  
  getWeather(baseURL, zipCode, addApi, apiKey)

    .then(function(data) {
      // Add data to POST request
      postWeather('/weatherData', {date: newDate, country: data.sys.country, city: data.name, temp: data.main.temp, condition: data.weather[0].description, feelings: feelings})

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
    console.log(data);
    return data;
  } 
  catch (error) {
    // appropriately handle the error
    console.log('error', error);
  };
};


/* Function to POST data */
const postWeather = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
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

// Update user interface
const updateUI = async () => {
  const req = await fetch('/weatherData');
  try {
    // Transform into JSON
    const allData = await req.json();
    console.log(allData);
    
    // Update new entry values
    document.querySelector('.entry').style.opacity = 1;
    document.querySelector('#date').innerText = `Today is ${allData.date}`;
    document.querySelector('#location').innerText = `Location is ${allData.country}, ${allData.city}`;
    document.querySelector('#temp').innerText = `Temperature is ${Math.round(allData.temp)}???`;
    document.querySelector('#condition').innerText = `Condition is ${allData.condition}`;
    document.querySelector('#content').innerText = `My feelings is ${allData.feelings}`;
  }
  catch (error) {
    // appropriately handle the error
    console.log('error', error);
  }
}