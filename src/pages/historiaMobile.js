import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./storyMobile.css";
import "../audioPlayer.css";
import HomeIcon from "../Asets/Home.svg";
import BookIcon from "../Asets/Book.svg";
import upScrollIcon from "../Asets/upScroll.svg";
import SocialIconsX from "../Asets/SocialIconsX.svg";
import SocialIconsTelegram from "../Asets/SocialIconsTelegram.svg";
import SocialIconsTT from "../Asets/SocialIconsTT.svg";
import Manifold from "../Asets/manifold.svg";
import SocialIconsInstagram from "../Asets/Instagram.svg";
import rozdzialy from "./rozdzialy";
import MobileRozdzialNav from "./MobileRozdzialNav";
import AudioControl from "../AudioPlayerUI";
import PasswordGate from "./PasswordGate";

const HistoriaMobile = () => {
  const [currentChapter, setCurrentChapter] = useState("1");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [passwordAccepted, setPasswordAccepted] = useState(false);
  const contentRef = useRef(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = (e) => {
    if (e) e.stopPropagation();
    console.log("Scrolling to top");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePasswordAccepted = () => {
    setPasswordAccepted(true);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const changeChapter = (chapter) => {
    setCurrentChapter(chapter);
    setIsNavOpen(false);
    scrollToTop();
  };

  const mint = (chapter) => {
    window.open(`https://example.com/${chapter}`, "_blank");
  };

  const getBannerSrc = () => {
    const bannerPath = rozdzialy[currentChapter].mobileBanner || rozdzialy[currentChapter].banner;
    
    try {
      const bannerFileName = bannerPath.replace('../Asets/', '');
      return require(`../Asets/${bannerFileName}`);
    } catch (error) {
      console.error('Error loading mobile banner image:', error);
      return null;
    }
  };
  
  const getNftSrc = () => {
    const nftPath = rozdzialy[currentChapter].nft;
    
    try {
      const nftFileName = nftPath.replace('../Asets/', '');
      return require(`../Asets/${nftFileName}`);
    } catch (error) {
      console.error('Error loading NFT image:', error);
      return null;
    }
  };

  if (!passwordAccepted) {
    return <PasswordGate onPasswordAccepted={handlePasswordAccepted} />;
  }

  return (
    <div className="story-mobile-container">
      <div className="story-mobile-header">
        {/* Top section with home icon, title, and book icon */}
        <div className="header-top" style={{ paddingRight: "15px" }}>
          <div className="header-left">
            <img 
              src={HomeIcon} 
              alt="Home" 
              className="nav-icon" 
              onClick={() => navigate("/")}
            />
          </div>
          
          <div className="header-content">
            <div className="header-text">
              <div className="diaries-title">DZIENNIK ARII INGRAM</div>
              <div className="chapter-title-mobile">
                <span style={{ color: '#FFFFFF', textAlign: 'left', display: 'block' }}>ROZDZIAŁ {currentChapter}</span>
              </div>
            </div>
          </div>
          
          <div className="header-right">
            <img 
              src={BookIcon} 
              alt="Chapters" 
              className="nav-icon" 
              onClick={toggleNav}
            />
          </div>
        </div>

        <div className="header-border"></div>

        <div className="header-top" style={{ paddingRight: "15px" }}>
          <div className="mobile-social-icons">
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
          
          <div className="nav-icon play-icon" style={{ paddingRight: "5px" }}>
            <AudioControl 
              audioSrc={rozdzialy[currentChapter].audio} 
              chapterTitle={rozdzialy[currentChapter].title}
            />
          </div>
        </div>
      </div>

      {isNavOpen && (
        <MobileRozdzialNav 
          currentChapter={currentChapter}
          chapters={rozdzialy}
          onSelectChapter={changeChapter}
          onClose={toggleNav}
        />
      )}
      
      <div className="mobile-banner-container">
        <img 
          src={getBannerSrc()} 
          alt={`Rozdział ${currentChapter} baner`} 
          className="mobile-banner-img" 
        />
      </div>
      
      <div className="mobile-nft-container">
        <div className="mobile-nft-img-wrapper shine">
          <img 
            src={getNftSrc()} 
            alt={`Rozdział ${currentChapter} NFT`} 
            className="mobile-nft-img" 
          />
        </div>
        <div className="mobile-nft-info">
          <h1 className="nft-title-h1">
            {rozdzialy[currentChapter]["nft-title-h1"].split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < rozdzialy[currentChapter]["nft-title-h1"].split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <h2 className="nft-title-h2">{rozdzialy[currentChapter]["nft-title-h2"]}</h2>
          <button className="mobile-mint-button" onClick={() => mint(currentChapter)}>
            Kup TERAZ
          </button>
        </div>
      </div>
      
      <div className="mobile-plot-container" ref={contentRef}>
        <p className="mobile-plot-summary">
          {rozdzialy[currentChapter].plot.split('\n').map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              <br /><br />
            </React.Fragment>
          ))}
        </p>
        
        <div className="mobile-plot">
          {rozdzialy[currentChapter].content.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="mobile-nft-container bottom-nft-container">
        <div className="mobile-nft-img-wrapper shine">
          <img 
            src={getNftSrc()} 
            alt={`Rozdział ${currentChapter} NFT`} 
            className="mobile-nft-img large-nft-img" 
          />
        </div>
        <div className="mobile-nft-info">
          <h1 className="nft-title-h1">
            {rozdzialy[currentChapter]["nft-title-h1-bottom"].split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < rozdzialy[currentChapter]["nft-title-h1-bottom"].split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <h2 className="nft-title-h2-bottom">{rozdzialy[currentChapter]["nft-title-h2-bottom"]}</h2>
          <button className="mobile-mint-button" onClick={() => mint(currentChapter)}>
            Kup TERAZ
          </button>
        </div>
      </div>
      
      {showBackToTop && (
        <img 
          src={upScrollIcon} 
          alt="Back to top" 
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "70px",
            right: "30px",
            width: "41px",
            height: "41px",
            cursor: "pointer",
            zIndex: 9999
          }}
        />
      )}
    </div>
  );
};

export default HistoriaMobile;