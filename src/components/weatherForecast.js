import React from 'react';
import ForecastCard from './forecastCard';
//was working on getting all the data to display right, I still have to put it in the carousel

const WeatherForecast = ({weatherData}) => {
    console.log(weatherData);
    return (
        <div>
            {weatherData.map((day, index) =>(
            <div key={index}>
                <ForecastCard 
                temperature={day.temperature}
                location={day.location}
                low={day.minTemp}
                high={day.maxTemp}
                w_icon={day.w_icon}
                day={day.dayValue}
                weather={day.weather}
                />
            </div>   
            ))}
                  
        </div>
    )
}
export default WeatherForecast;