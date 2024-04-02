
import search_icon from "./Assets/search.png";
import clear_icon from "./Assets/clear.png";
import cloud_icon from "./Assets/cloud.png";
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import ForecastCard from "./components/forecastCard";

import { useState, useEffect } from "react";

function App() {
  const api_key = "08de2ad7dfc7a3e9d91d1e9a29adea2d"; //This is Emily's key it's active

  //forecast props
  const[temperature, setTemperature] = useState("50 °F");
  const[location, setLocation] = useState("West Springfield");
  const[low, setLow] = useState("1 °F");
  const[high, setHigh] = useState("120 °F");
  const[searchItem, setSearchItem] = useState("");
  const[w_icon, setW_icon] = useState(cloud_icon);
  const[dayValue, setDay] = useState("");

  //day formats
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  function getDayMonth(date) {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = dateObject.toLocaleString("default", {month:"short"});

    return `${month} ${day}`;

  }

  

  //urls
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchItem}&appid=${api_key}&units=imperial&exclude={minutely}`;
  const historical_url = `https://api.openweathermap.org/data/2.5/timemachine?q=${searchItem}&dt=${yesterday}&appid=${api_key}&units=imperial$exclude=minutely`

  const Search = async () =>{
    if(searchItem.trim() === ""){
      return 0;
    }

    try{
      const response = await fetch(url); 
      const data  = await response.json();
      setLocation(data.name);
      setTemperature(Math.floor(data.main.temp) + "°F");
      setLow(Math.floor(data.main.temp_min) + "°F"); //not functioning note 17:40
      setHigh(Math.floor(data.main.temp_max) + "°F"); //not functioning
      setDay(getDayMonth(today));
            
      // set weather icon

      if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
        setW_icon(clear_icon);
      }else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
        setW_icon(cloud_icon);
      }else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
        setW_icon(drizzle_icon);
      }else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
        setW_icon(drizzle_icon);
      }else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
        setW_icon(rain_icon);
      }else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
        setW_icon(rain_icon);
      }else if(data.weather[0].icon === "11d" || data.weather[0].icon === "11n"){
        setW_icon(rain_icon);
      }else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
        setW_icon(snow_icon);
      }


    } catch(error){
      console.log(error);
    }
  }


  return (
    <div className="full-container bg-gradient-to-b from-[#A7D9EE] to-white pb-[60px]">
      <div className="top-bar flex justify-center pt-[60px] gap-[14px]">
        <input
          type="text"
          className="text flex w-[50%] h-[48px] bg-white border-none rounded-full pl-[40px] text-gray-500 font-normal outline-none text-[20px]"
          placeholder="Search..."
          value={searchItem}
          onChange={ e => setSearchItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              Search();
            }
          }}
        />

        <div className="search-icon flex justify-center w-[78px] h-[48px] bg-white rounded-full cursor-pointer items-center" onClick={Search}>
          <img src={search_icon} alt="search" />
        </div>
      </div>
        <div className="justify-center">
          <ForecastCard
            temperature={temperature}
            location={location}
            low={low}
            high={high}
            w_icon={w_icon}
            day={dayValue}
          />
       </div>
      </div>
      );
}

export default App;
