import React, { useEffect, useState } from 'react';

const Countdown = () => {
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        updateTimeRemaining();
        const timerId = setInterval(() => {
            updateTimeRemaining();
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const updateTimeRemaining = () => {
        const now = new Date();
        const target = new Date(2024, 9, 2, 19, 0, 0); 

        const distance = target.getTime() - now.getTime();

        if (distance <= 0) {
            setTimeRemaining({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            });
            return;
        }

        setTimeRemaining(calculateTimeRemaining(distance));
    };

    const calculateTimeRemaining = (distance) => {
        const remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);
        const remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const remainingHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingDays = Math.floor(distance / (1000 * 60 * 60 * 24));

        return {
            days: remainingDays,
            hours: remainingHours,
            minutes: remainingMinutes,
            seconds: remainingSeconds,
        };
    };

    return (
        <>
            <div className="countdown">
                <div className="months-days">
                    <div className="time-box">
                        <span className="time">{timeRemaining.days}</span>
                        <div className="title">
                            <span className="label">Days</span>
                        </div>
                    </div>
                </div>
                <div className="ho-min-sec">
                    <div className="time-box">
                        <span className="time">{timeRemaining.hours}</span>
                        <div className="title">
                            <span className="label">Hours</span>
                        </div>
                    </div>
                    <span className="colon">:</span>
                    <div className="time-box">
                        <span className="time">{timeRemaining.minutes}</span>
                        <div className="title">
                            <span className="label">Minutes</span>
                        </div>
                    </div>
                    <span className="colon">:</span>
                    <div className="time-box">
                        <span className="time">{timeRemaining.seconds}</span>
                        <div className="title">
                            <span className="label">Seconds</span>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    );
};

export default Countdown;