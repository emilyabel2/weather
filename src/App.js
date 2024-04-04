
import search_icon from "./Assets/search.png";
import WeatherForecast from "./components/weatherForecast";

import { useState, useEffect} from "react";

function App() {
  // const api_key = "08de2ad7dfc7a3e9d91d1e9a29adea2d"; //This is Emily's key it's active
  const api_key = '5RMG83NKYSEQDZCQKFP9KWW4J';

  //forecast props
  // const[temperature, setTemperature] = useState("");
  // const[location, setLocation] = useState("Enter a location to start");
  // const[low, setLow] = useState("");
  // const[high, setHigh] = useState("");
  const[searchItem, setSearchItem] = useState("");
  // const[w_icon, setW_icon] = useState(cloud_icon);
  // const[dayValue, setDay] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [weatherCards, setWeatherCards] = useState([]);

  //get day range formats
  
  const [leftDate, setLeftDate] = useState(null);
  const [rightDate, setRightDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    const left = new Date(today);
    console.log(today);
    left.setDate(today.getDate() - 3);
    const right = new Date(today);
    right.setDate(today.getDate() + 3);

    setLeftDate(left);
    setRightDate(right);
  }, []);

  // Format the dates as "YYYY-MM-DD"
  const leftRange = leftDate?.toISOString().slice(0, 10);
  const rightRange = rightDate?.toISOString().slice(0, 10);

  //function that formats dates from 'YYYY-MM-DD' to "Mon DD" example: "2024-03-04" -> "Mar 4"
  const formatDate = (date) => {
    const inputDate = new Date(date);
    const formatted = inputDate.toLocaleString('en-us', {month: 'short', day:'numeric'});
    return formatted;
  };
  
 
  //urls
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchItem}/${leftRange}/${rightRange}?unitGroup=us&key=${api_key}&contentType=json`
  
  const Search = async () =>{
    if(searchItem.trim() === ""){
      return 0;
    }

    try{
      const response = await fetch(url); 
      const data  = await response.json();
      console.log(data.days);
      setWeatherData(data.days);
      console.log(weatherData);
      const weatherCards = weatherData.map((day) => ({
        dayValue: formatDate(day.datetime),
        temperature: Math.round(day.temp),
        maxTemp: Math.ceil(day.tempmax),
        minTemp: Math.floor(day.tempmin),
        w_icon: day.icon,
        location: data.address.toUpperCase(),
        weather: day.conditions,
      }));
    
      // Set the weather cards state
      setWeatherCards(weatherCards);
      console.log(weatherCards)
      
    } catch(error){
      console.log(error);
    }
  }

  return (
    <div className="full-container bg-gradient-to-b from-[#A7D9EE] to-white pb-[60px]">
      <div className="top-bar flex justify-center pt-[60px] gap-[14px] pb-[0px]">
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
          <WeatherForecast weatherData={weatherCards}/>
       </div>
      </div>
      );
}

export default App;
