import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CountdownTimer.css';
import ariaProfile from "../Asets/ARIAprofile2.wep";

const CountdownScreen = () => {
  const navigate = useNavigate();
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
        // If countdown is over, reload the page to show the actual app
        window.location.reload();
      }
    };
    
    calculateTimeLeft();
    
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="countdown-overlay" style={{ position: 'fixed', height: '100vh', width: '100vw', background: '#000' }}>
      <div className="countdown-content">
        <button 
          className="close-countdown" 
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#FF0000',
            fontSize: '36px',
            lineHeight: '1',
            cursor: 'pointer',
            padding: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform 0.2s',
            zIndex: 1100
          }}
        >
          <span>×</span>
        </button>
        
        <img 
          src={ariaProfile} 
          alt="Aria Profile" 
          style={{ width: '250px', maxHeight: '300px', marginBottom: '20px' }}
        />
        
        <div className="countdown-header">ARIA INGRAM DIARIES</div>
        <div className="countdown-title">COMING SOON</div>
        
        <div className="countdown-timer">
          {`${timeLeft.days * 24 + timeLeft.hours}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`}
        </div>
      </div>
    </div>
  );
};

export default CountdownScreen;