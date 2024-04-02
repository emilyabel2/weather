
import search_icon from "./Assets/search.png";
import clear_icon from "./Assets/clear.png";
import cloud_icon from "./Assets/cloud.png";
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";

import { useState } from "react";

function App() {
  const api_key = "08de2ad7dfc7a3e9d91d1e9a29adea2d"; //This is Emily's key it's active

  const[temparature, setTemparature] = useState("50 °F");
  const[location, setLocation] = useState("West Springfield");
  const[low, setLow] = useState("1 °F");
  const[high, setHigh] = useState("120 °F");
  const[searchItem, setSearchItem] = useState("");
  const[w_icon, setW_icon] = useState(cloud_icon);

  const search = async () =>{
    if(searchItem.trim() === ""){
      return 0;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchItem}&appid=${api_key}&units=imperial`; 

    try{
      const response = await fetch(url); 
      const data  = await response.json();
      setLocation(data.name);
      setTemparature(Math.floor(data.main.temp) + "°F");
      setLow(Math.floor(data.main.temp_min) + "°F");
      setHigh(Math.floor(data.main.temp_max) + "°F");

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
          className="text flex w-[50%] h-[78px] bg-white border-none rounded-full pl-[40px] text-gray-500 font-normal outline-none text-[20px]"
          placeholder="Search . . . "
          value={searchItem}
          onChange={ e => setSearchItem(e.target.value)}
        />
        <div className="search-icon flex justify-center w-[78px] h-[78px] bg-white rounded-full cursor-pointer items-center" onClick={search}>
          <img src={search_icon} alt="search" />
        </div>
      </div>

      <div className="container w-[607px] h-[829px] mx-auto rounded-[12px] mt-[75px] bg-gradient-to-b from-[#2C336D] to-[#888FC9]">
        <div className="day flex justify-center pt-[30px] font-extrabold text-white text-[60px]">TODAY</div>
        <div className="weather-image  flex justify-center">
          <img src={w_icon} alt="" />
        </div>
        <div className="now flex mt-[23px] justify-center text-[#fff] text-[50px] font-normal">
          <p>N O W</p>
        </div>
        <div className="weather-temp flex justify-center text-white text-[120px] font-thin">
        {temparature}
        </div>
        <div className="weather-location flex justify-center text-white text-[60px] font-thin ">
        {location}
        </div>
        <div className="weather-highlow mt-[20px] flex justify-center text-center gap-10 text-[20px]">
        <div className="weather-low text-blue-300 font-extrabold">
            {low}
            <div>Low</div>
          </div>
          <div className="weather-high text-orange-300 font-extrabold pl-8 border-l-2 border-[#C1BDBD]">
            {high}
            <div>High</div>
            </div>
        </div>
      </div>
    </div>
      );
}

export default App;
