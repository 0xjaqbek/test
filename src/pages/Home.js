import "./home.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ariaProfile from "../Asets/ARIAprofile2.webp";
import frame from "../Asets/frame.svg";
import SocialIconsX from "../Asets/SocialIconsX.svg";
import SocialIconsTelegram from "../Asets/SocialIconsTelegram.svg";
import SocialIconsTT from "../Asets/SocialIconsTT.svg";
import Manifold from "../Asets/manifold.svg";
import SocialIconsInstagram from "../Asets/Instagram.svg";

function Home() {
  const [userName, setUserName] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      console.log("user found: " + storedUserName);
      setUserName(storedUserName);
    } else {
      console.log("new user");
    }

    setIsLoading(false);

    const smallHeaderTimer = setTimeout(() => {
      setAnimationStage(1);
    }, 500);

    const profileTimer = setTimeout(() => {
      setAnimationStage(2);
    }, 1500);

    const headerTextTimer = setTimeout(() => {
      setAnimationStage(3);
    }, 2000);

    const buttonsTimer = setTimeout(() => {
      setAnimationStage(4);
    }, 2500);
    
    const firstButtonHoverTimer = setTimeout(() => {
      setAnimationStage(5);
    }, 3000);
    
    const secondButtonHoverTimer = setTimeout(() => {
      setAnimationStage(6);
    }, 3500);
    
    const resetHoverTimer = setTimeout(() => {
      setAnimationStage(4);
    }, 4000);

    return () => {
      clearTimeout(smallHeaderTimer);
      clearTimeout(profileTimer);
      clearTimeout(headerTextTimer);
      clearTimeout(buttonsTimer);
      clearTimeout(firstButtonHoverTimer);
      clearTimeout(secondButtonHoverTimer);
      clearTimeout(resetHoverTimer);
    };
  }, []);

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="landing-page">
      {/* Separate header section */}
      <header className="home-header">
        <div className="home-header-container">
          <div className={`small-header-main ${animationStage >= 1 ? 'slide-down' : ''}`}>
            <div className="header-title-container">
              <div className="small-header-title">
                ARIA INGRAM'S DIARIES
              </div>
            </div>
            <div className="social-icons">
            <a href="https://x.com/0xariaingram/" target="_blank" rel="noopener noreferrer">
              <img src={SocialIconsX} alt="X" className="mobile-social-icon" />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <img src={SocialIconsTelegram} alt="Telegram" className="mobile-social-icon" />
            </a>
            <a href="https://tiktok.com/@0xariaingram/" target="_blank" rel="noopener noreferrer">
              <img src={SocialIconsTT} alt="TikTok" className="mobile-social-icon" />
            </a>
            <a href="https://instagram.com/0xariaingram/" target="_blank" rel="noopener noreferrer">
              <img src={SocialIconsInstagram} alt="Instagram" className="mobile-social-icon" />
            </a>
            <a href="https://manifold.xyz" target="_blank" rel="noopener noreferrer">
              <img src={Manifold} alt="Manifold" className="mobile-social-icon" />
            </a>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content section */}
      <main className="home-content">
        <div className={`topGroup ${animationStage >= 2 ? 'slide-down' : ''}`}>
          <img 
            className="ariaProfile" 
            src={ariaProfile} 
            alt="ariaProfile" 
          />
          <div className="frameContainer">
            <div className={`headerTxt ${animationStage >= 3 ? 'fade-in' : ''}`}>
              {userName ? (
                <p className="line">
                  Hello, {userName}! <br />
                  Good to see you again.
                </p>
              ) : (
                <>
                  <p className="line">
                    Hello adventurer! <br /> MY NAME IS ARIA INGRAM.
                  </p>
                  <p className="line">
                    <span className="highlight"> ready</span> to follow my story?
                  </p>
                </>
              )}
            </div>

            <img className="frame" src={frame} alt="frame" />
          </div>
        </div>
        
        <div className="buttons-container">
          <button 
            onClick={() => navigate("/story")} 
            className={`button ${animationStage >= 4 ? 'slide-up' : ''} ${animationStage === 5 ? 'auto-hover' : ''}`}
          >
            ENTER STORY
          </button>
          <button 
            onClick={() => navigate("/chat")} 
            className={`button button2 ${animationStage >= 4 ? 'slide-up' : ''} ${animationStage === 6 ? 'auto-hover' : ''}`}
          >
            LETS TALK
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;