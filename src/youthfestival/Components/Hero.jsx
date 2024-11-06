import React, { useState, useEffect } from "react";
import "../ComponentsCSS/hero.css";

function Hero() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2024-11-30T12:00:00"); // Target date for countdown

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
    <div className="youthfestival ">
      <div
        style={{
          backgroundImage: `url('festivalimages/yfpbg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column', // Stack elements vertically
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="content-container">
          <img
            src="festivalimages/yfplogo.png"
            alt="Overlay"
            className="overlay-image"
          />
          <h1 style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '20px', color: 'white' }} className="main-text text-white fs-1">//PHASE 2</h1>
        </div>

        {/* Countdown timer positioned below content */}
        <div className="countdown-container">
          <div>
            <p id="days" className="big-text">{timeRemaining.days}</p>
            <span style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '20px', color: 'white' }}>DAYS</span>
          </div>
          <div>
            <p id="hours" className="big-text">{timeRemaining.hours}</p>
            <span style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '20px', color: 'white' }}>HOURS</span>
          </div>
          <div>
            <p id="mins" className="big-text">{timeRemaining.minutes}</p>
            <span style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '20px', color: 'white' }}>MINS</span>
          </div>
          <div>
            <p id="sec" className="big-text">{timeRemaining.seconds}</p>
            <span style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '20px', color: 'white' }}>SECONDS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;