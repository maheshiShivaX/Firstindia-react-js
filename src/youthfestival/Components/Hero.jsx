import React, { useState, useEffect } from "react";
import "../ComponentsCSS/hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2024-10-19T12:00:00"); // Change this to your countdown target date and time

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className='youthfestival'>
      <div className="container-nav">
        <div className="overlay"></div>
        <div className="wrapper">
          <div className="timer">
            <h1 className="title">
              <span>Youth Festival+</span>
              <Link to="/youthfestivalplus/applicationform" class="btn btn-lg active" >APPLY NOW</Link>
            </h1>
            <div className="countdown-container">
              <div>
                <p id="days" className="big-text">{timeRemaining.days}</p>
                <span>DAYS</span>
              </div>
              <div>
                <p id="hours" className="big-text">{timeRemaining.hours}</p>
                <span>HOURS</span>
              </div>
              <div>
                <p id="mins" className="big-text">{timeRemaining.minutes}</p>
                <span>MINS</span>
              </div>
              <div>
                <p id="sec" className="big-text">{timeRemaining.seconds}</p>
                <span>SECONDS</span>
              </div>
            </div>
            
          </div> 
          
        </div>
      </div>
    </div>
  );
}