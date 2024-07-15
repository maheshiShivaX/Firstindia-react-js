import React, { useEffect, useState } from 'react';

const Countdown = () => {
    const [timeRemaining, setTimeRemaining] = useState({
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
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
        const target = new Date(now.getFullYear(), 8, 30);

        if (now > target) {
            const nextYearTarget = new Date(now.getFullYear() + 1, 8, 30);
            const distance = nextYearTarget.getTime() - now.getTime();
            const remainingMonths = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
            const remainingDays = getCurrentMonthRemainingDays();
            const remainingHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeRemaining({
                months: remainingMonths,
                days: remainingDays,
                hours: remainingHours,
                minutes: remainingMinutes,
                seconds: remainingSeconds
            });
        } else {
            const distance = target.getTime() - now.getTime();
            const remainingMonths = Math.floor(distance / (1000 * 60 * 60 * 24 * 30)); // Assuming 30 days in a month
            const remainingDays = getCurrentMonthRemainingDays();
            const remainingHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeRemaining({
                months: remainingMonths,
                days: remainingDays,
                hours: remainingHours,
                minutes: remainingMinutes,
                seconds: remainingSeconds
            });
        }
    };

    const getCurrentMonthRemainingDays = () => {
        const now = new Date();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const remainingDays = endOfMonth.getDate() - now.getDate();
        return remainingDays;
    }

    return (
        <>
            <div className="countdown">
                <div className="months-days">
                    <div className="time-box">
                        <span className="time">{timeRemaining.months}</span>
                        <div className="title">
                            <span className="label">Months</span>
                        </div>
                    </div>
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