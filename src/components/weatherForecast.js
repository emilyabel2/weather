import React, { useState } from 'react';
import ForecastCard from './forecastCard';
import '../style/weatherForecast.css';

const WeatherForecast = ({ weatherData }) => {
    const [currentIndex, setCurrentIndex] = useState(3);

    const handleArrowClick = (direction) => {
        if (direction === 'left') {
            setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (direction === 'right') {
            setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, weatherData.length - 1));
        }
    };
    let startIndex, endIndex;

    if (currentIndex === 0) {
        // If at the first card, keep the same spacing but don't display the previous card
        startIndex = 0;
        endIndex = 2;
    } else if (currentIndex === 6) {
        // If at the last card, keep the same spacing but don't display the next card
        startIndex = 4;
        endIndex = 6;
    } else {
        // Normal behavior for other cases
        startIndex = currentIndex - 1;
        endIndex = currentIndex + 1;
    }

    return (
        <div className="parent-container">
            <button className="carousel-button" onClick={() => handleArrowClick('left')}>&lt;</button>
            <div className="stacked-carousel">
                <div className="carousel-items">
                    {weatherData.map((day, index) => {
                        const isCenter = index === currentIndex;
                        const isBefore = index < startIndex;
                        const isAfter = index > endIndex;

                        let className = 'forecast-card';
                        if (isCenter) className += ' center';
                        if (isBefore || isAfter) className += ' hidden';

                        return (
                            <div key={index} className={className}>
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
                        );
                    })}
                </div>
            </div>
            <button className="carousel-button" onClick={() => handleArrowClick('right')}>&gt;</button>
        </div>
    );
};

export default WeatherForecast;

