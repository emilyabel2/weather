import React from 'react';
import ForecastCard from './forecastCard';

const WeatherForecast = () => {
    // gotta call the api twice to get historical data for yesterday value and current data for today and upcoming days
    //then, organize it here, maybe we should reconsider doing previous days weather? especially if we run out of time
    //gotta figure out how to get the upcoming days from the API as well
    const todayData = {};
    const tomorrowData = {};
    const yesterdayData = {};


    return (
        <div>
            <ForecastCard data={yesterdayData} dayValue="Yesterday" />
            <ForecastCard data={todayData} dayValue="Today" />
            <ForecastCard data={tomorrowData} dayValue="Tomorrow" />        
        </div>
    )
}