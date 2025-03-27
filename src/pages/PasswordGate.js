import React, { useState, useEffect } from "react";
import "./PasswordGate.css";
import ariaProfile from "../Asets/ARIAprofile2.webp";
import frame from "../Asets/frame.svg";

const PasswordGate = ({ onPasswordAccepted }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // List of valid passwords
  const validPasswords = [
    "moonstones", 
    "2137", 
    "thePolacy", 
    "decentralinacja", 
    "scifi", 
    "fantastyka", 
    "czytajmnie", 
    "najlepsza", 
    "fanclub", 
    "ariawakeupPL", 
    "uwolnijarie"
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (!validPasswords.includes(password)) {
      setError("Autoryzacja nieudana");
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onPasswordAccepted();
    }, 1500);
  };

  return (
    <div className="password-gate-overlay">
      <div className="password-gate-container">
        <img 
          className="aria-profile-password" 
          src={ariaProfile} 
          alt="Aria Profile" 
        />
        
        <div className="frame-container-password">
          <div className="header-txt-password">
            <p className="password-text">ZIDENTYFIKUJ SIĘ</p>
            <form onSubmit={handlePasswordSubmit} className="auth-form">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="*****"
                className="auth-input"
                autoFocus
              />
              
              {error && <div className="auth-error">{error}</div>}
              
              <button 
                type="submit" 
                className="auth-submit-button"
                disabled={isLoading}
              >
                {isLoading ? "WERYFIKACJA..." : "ZATWIERDŹ"}
              </button>
            </form>
          </div>
          <img className="frame-password" src={frame} alt="frame" />
        </div>
      </div>
    </div>
  );
};

export default PasswordGate;