import './App.css';
import { useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({city: "", temp:"", desc: "", feel: "", hum: "",});

  const getWeather = () => {
    axios.get(baseUrl + `q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
    .then(response => {
      
      setWeatherData ({
        city: location,
        temp: response.data.main ? response.data.main.temp.toFixed() : null,
        desc: response.data.weather ? response.data.weather[0].main : null,
        feel: response.data.main ? response.data.main.feels_like.toFixed() : null,
        hum: response.data.main ? response.data.main.humidity : null,
      })
    })
  }

  return (
    <div className="App">
        <div className="square">
        <div className="container">
        <div className="search-bar">
          <input type = "text" placeholder="Enter a state or city..."
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          />

        <button onClick={getWeather}>🔎</button>

        </div>

        </div>
      

        
        <div className="city">{weatherData.city}</div>

        <div className="temp">
          {weatherData.temp}ºF
        </div>

        <div>
        <div className="desc">{weatherData.desc}</div>
        </div>


        <div className="bottomcont">
        <div>Feels Like:
        <div className="feel">{weatherData.feel}ºF</div>
        </div>
        <div>Humidtiy:
        <div className="hum">{weatherData.hum}%</div>
        </div>
       
        </div>

      </div>
     

    </div>
  );
}

export default App;