import React, { useState, useEffect, useMemo } from 'react';
import ariaProfile from "./Asets/ARIAprofile2.png";
import landingScreen from "./Asets/landingScreen.png";
import landingMobileScreen from "./Asets/landingMobileScreen.jpg";
import { setupDevToolsProtection } from './ObfuscationHelper';
import './LaunchGuard.css';

const LaunchGuard = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isLaunched, setIsLaunched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Store targetDate in useMemo to prevent recreating it on every render
  const targetDate = useMemo(() => new Date('2025-04-03T21:00:00+01:00'), []);
  
  // Improved version with useCallback to avoid recreation on every render
  const calculateTimeLeft = useMemo(() => {
    return () => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
        return false;
      } else {
        setIsLaunched(true);
        sessionStorage.setItem('app_launched', 'true');
        return true;
      }
    };
  }, [targetDate]);

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Prevent potential errors with setupDevToolsProtection
    try {
      setupDevToolsProtection();
    } catch (error) {
      console.error('Failed to setup dev tools protection:', error);
    }
    
    // Check if launch date has passed
    const verifyLaunchDate = () => {
      const now = new Date();
      return now >= targetDate;
    };
    
    // Check if we've already authenticated the launch in this session
    const sessionLaunched = sessionStorage.getItem('app_launched');
    if (sessionLaunched === 'true' && verifyLaunchDate()) {
      setIsLaunched(true);
      return;
    }
    
    // Initial calculation
    calculateTimeLeft();
    
    // Timer to update countdown
    const timer = setInterval(() => {
      const launched = calculateTimeLeft();
      if (launched) {
        clearInterval(timer);
      }
    }, 1000);
    
    // Periodic verification to prevent tampering
    const verifyTimer = setInterval(() => {
      if (!verifyLaunchDate() && isLaunched) {
        // Something's wrong, they're trying to bypass the countdown
        sessionStorage.removeItem('app_launched');
        window.location.reload();
      }
    }, 5000);
    
    return () => {
      clearInterval(timer);
      clearInterval(verifyTimer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [calculateTimeLeft, isLaunched, targetDate]);
  
  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };
  
  // If launched, show the actual app content
  if (isLaunched) {
    return children;
  }
  
  // Otherwise show the countdown
  return (
    <div className="launch-guard">
      {/* Background image with opacity and blur */}
      <div 
        className="launch-guard-background"
        style={{
          backgroundImage: `url(${isMobile ? landingMobileScreen : landingScreen})`,
          opacity: 0.25,
          filter: 'blur(2px)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}
      />
      
      <div className="launch-guard-content">
        <div className="countdown-header">ARIA INGRAM'S DIARIES</div>
        <div className="countdown-title">COMING SOON</div>
        
       {/* <div className="countdown-timer">
          {`${timeLeft.days * 24 + timeLeft.hours}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`}
        </div> */}
      </div>
    </div>
  );
};

export default LaunchGuard;