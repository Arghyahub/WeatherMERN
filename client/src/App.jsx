import { useEffect, useState } from "react";

import "./App.css"

const App = () => {
  // Defining States to be used in the app
  const [City, setCity] = useState('kolkata') ;
  const [Main, setMain] = useState('') ;
  const [Icon, setIcon] = useState('') ;
  const [OtherData, setOtherData] = useState([]) ;

  // Function to fetch data from backend
  const getData = async () => {
    const output = await fetch(`http://localhost:8000/getWeather/${City}`);
    const json = await output.json();
    
    setMain(json.weather[0].main) ;
    setIcon(`https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`) ;
    setOtherData([ 
      { name: "Temp" , data: json.main.temp , icon: "images/temp.svg" } ,
      { name: "Feels" , data: json.main.feels_like , icon: "images/feels.svg" } , 
      { name: "Wind" , data: json.wind.speed , icon: "images/wind.svg" }
    ]) ;

  }

  // Search Feature
  const search = (e) => {
    e.preventDefault() ;
    const searchVal = e.target.elements.city.value ;
    setCity(searchVal) ;
    getData() ;
  }

  useEffect(() => {
    getData() ;
  }, [])

  return (
    <div id="app">
      <form onSubmit={search} className="search-div">
        <input name="city" type="text" className="search-ip" />
        <button className="search-btn">🔍</button>
      </form>

      <div className="weather-data">
        <div className="weather-icon"><img src={Icon} alt="WeatherIcon" /></div>
        
        <div className="temp">
          <h2 className="city-name">{City}</h2>
          <h5>{Main}</h5>
        </div>

        <div className="weather-info">
          { OtherData.map( (elem,ind) => (
            <>
            <div className="flrow" key={ind}>
              <img className="stats-img" src={elem.icon} alt="temp" />
              <div>
                <p>{elem.name}</p>
                <p>{elem.data}</p>
              </div>
            </div>
            </>
            )
          )}
        </div>

      </div>
    </div>
  )
}

export default App;