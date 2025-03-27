import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const targetDate = new Date('2025-03-10T00:00:00+01:00');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    calculateTimeLeft();
    
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className="countdown-overlay">
      <div className="countdown-content">
        <button className="close-countdown" onClick={onClose}>
          <span>×</span>
        </button>
        
        <div className="countdown-header">ARIA INGRAM DIARIES</div>
        <div className="countdown-title">COMING SOON</div>
        
        <div className="countdown-timer">
          {`${timeLeft.days * 24 + timeLeft.hours}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;