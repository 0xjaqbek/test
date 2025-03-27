import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../audioPlayer.css";
import HomeIcon from "../Asets/Home.svg";
import ChevronsUpIcon from "../Asets/ChevronsUp.svg";
import BookIcon from "../Asets/Book.svg";
import SocialIconsX from "../Asets/SocialIconsX.svg";
import SocialIconsTelegram from "../Asets/SocialIconsTelegram.svg";
import SocialIconsTT from "../Asets/SocialIconsTT.svg";
import Manifold from "../Asets/manifold.svg";
import SocialIconsInstagram from "../Asets/Instagram.svg";
import RozdzialDropdown from "./RozdzialDropdown";
import MobileRozdzialNav from "./MobileRozdzialNav";
import AudioControl from "../AudioPlayerUI";
import upScrollIcon from "../Asets/upScroll.svg";

const HistoriaHeader = ({ scrollToTop, currentChapter, chapterTitle, onChangeChapter, chapters, useHeaderMobile = false }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (useHeaderMobile) {
      const handleScroll = () => {
        setShowBackToTop(window.scrollY > 200);
      };
      
      window.addEventListener('scroll', handleScroll);
      handleScroll(); 
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [useHeaderMobile]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleChapterSelect = (chapterKey) => {
    onChangeChapter(chapterKey);
    setIsNavOpen(false);
  };

  const handleScrollToTop = (e) => {
    e.stopPropagation();
    scrollToTop();
  };

  if (useHeaderMobile) {
    return (
      <>
        <div className="story-mobile-header">
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
                audioSrc={chapters[currentChapter].audio} 
                chapterTitle={chapterTitle}
              />
            </div>
          </div>
        </div>

        {isNavOpen && (
          <MobileRozdzialNav 
            currentChapter={currentChapter}
            chapters={chapters}
            onSelectChapter={handleChapterSelect}
            onClose={toggleNav}
          />
        )}

        {showBackToTop && (
          <img 
            src={upScrollIcon} 
            alt="Back to top" 
            onClick={handleScrollToTop}
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
      </>
    );
  }

  return (
    <>
      <div className="story-header">
        <div className="story-header-left">
          <img 
            src={HomeIcon} 
            alt="Home" 
            className="story-nav-icon" 
            onClick={() => navigate("/")}
          />
        </div>
        
        <div className="story-header-center">
          <div className="story-header-title-container">
            <div className="story-title-wrapper">
              <span className="story-header-title">DZIENNIK ARII INGRAM</span>
              <span className="chapter-number">ROZDZIAŁ {currentChapter}</span>
              <span className="chapter-title">{chapterTitle}</span>
            </div>
            <img 
              src={BookIcon} 
              alt="Book" 
              className="story-nav-icon book-icon" 
              onClick={toggleDropdown}
            />
            <AudioControl 
              audioSrc={chapters[currentChapter].audio} 
              chapterTitle={chapterTitle}
              className="story-nav-icon play-icon"
            />
          </div>
        </div>
        
        <div className="story-header-right">
          <div className="social-icons-inline">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src={SocialIconsX} alt="X" className="social-icon" />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <img src={SocialIconsTelegram} alt="Telegram" className="social-icon" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <img src={SocialIconsTT} alt="TikTok" className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={SocialIconsInstagram} alt="Instagram" className="social-icon" />
            </a>
            <a href="https://manifold.xyz" target="_blank" rel="noopener noreferrer">
              <img src={Manifold} alt="Manifold" className="social-icon" />
            </a>
          </div>
          <img 
            src={ChevronsUpIcon} 
            alt="Scroll to top" 
            className="story-nav-icon scroll-top-icon" 
            onClick={handleScrollToTop}
            style={{ zIndex: 150 }}
          />
        </div>
      </div>

      <RozdzialDropdown 
        chapters={chapters} 
        isOpen={dropdownOpen} 
        onClose={closeDropdown} 
        onSelectChapter={handleChapterSelect}
      />
    </>
  );
};

export default HistoriaHeader;