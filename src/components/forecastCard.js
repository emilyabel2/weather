import React from 'react';

const ForecastCard = ({temperature, location, low, high, w_icon, day, weather}) => {
  return(
        <div className="container w-[607px] h-[829px] mx-auto rounded-[12px] mt-[75px] bg-gradient-to-b from-[#2C336D] to-[#888FC9]">
        <div className="day flex justify-center pt-[30px] font-extrabold text-white text-[60px]">{day}</div>
        <div className="weather-image  flex justify-center">
          {/* this doesnt work right yet */}
          <img src={`./Assets/${w_icon}.png`} alt={weather} /> 
        </div>
        <div className="now flex mt-[23px] justify-center text-[#fff] text-[50px] font-normal">
          <p>N O W</p>
        </div>
        <div className="weather-temp flex justify-center text-white text-[120px] font-thin">
        {temperature}°F
        </div>
        <div className="weather-location flex justify-center text-white text-[60px] font-thin ">
        {location}
        </div>
        <div className="weather-highlow mt-[20px] flex justify-center text-center gap-10 text-[20px]">
        <div className="weather-low text-blue-300 font-extrabold">
            {low}°F
            <div>Low</div>
          </div>
          <div className="weather-high text-orange-300 font-extrabold pl-8 border-l-2 border-[#C1BDBD]">
            {high}°F
            <div>High</div>
            </div>
            </div>
        </div>
   );
};

export default ForecastCard;
