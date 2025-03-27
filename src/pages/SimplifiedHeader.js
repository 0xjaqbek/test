import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../Asets/Home.svg";
import BookIcon from "../Asets/Book.svg";
import ChevronsUpIcon from "../Asets/ChevronsUp.svg";
import SocialIconsX from "../Asets/SocialIconsX.svg";
import SocialIconsTelegram from "../Asets/SocialIconsTelegram.svg";
import SocialIconsTT from "../Asets/SocialIconsTT.svg";
import SocialIconsInstagram from "../Asets/Instagram.svg";
import Manifold from "../Asets/manifold.svg";
import ChapterDropdown from "./ChapterDropdown";
import chapters from "./chapters";
import { useSimpleHeaderMediaQuery } from "../DeviceDetection";

const SimplifiedHeader = ({ scrollToTop, title, showChaptersButton = true }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Use header media query for 1200px breakpoint
  const useHeaderMobile = useSimpleHeaderMediaQuery();
  
  // Debug: Log when component renders
  useEffect(() => {
    console.log("SimplifiedHeader rendered, scrollToTop is:", typeof scrollToTop);
  }, [scrollToTop]);

  // Direct scrolling implementation
  const handleScrollToTop = (e) => {
    // Prevent default behavior and stop propagation
    e.preventDefault();
    e.stopPropagation();
    
    console.log("Header scroll button clicked - direct action");
    
    // Direct scrolling implementation without checking the prop first
    try {
      console.log("Attempting smooth scroll");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      console.log("Smooth scroll failed, using fallback");
      // Fallback for older browsers
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    
    // Call the prop method as well if it exists
    if (typeof scrollToTop === 'function') {
      console.log("Calling provided scrollToTop function");
      scrollToTop();
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Handle chapter selection
  const handleChapterSelect = (chapterKey) => {
    navigate(`/story#${chapterKey}`);
    closeDropdown();
  };

  // Render mobile header if useHeaderMobile is true
  if (useHeaderMobile) {
    return (
      <>
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
                <div className="diaries-title">ARIA INGRAM'S DIARIES</div>
                <div className="chapter-title-mobile">
                  <span style={{ fontSize:"14px", color: '#FFFFFF', textAlign: 'left', display: 'block' }}>{title}</span>
                </div>
              </div>
            </div>
            
            {showChaptersButton && (
              <div className="header-right">
                <img 
                  src={BookIcon} 
                  alt="Chapters" 
                  className="nav-icon" 
                  onClick={toggleDropdown}
                />
              </div>
            )}
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
            
            <img 
              src={ChevronsUpIcon} 
              alt="Scroll to top" 
              className="nav-icon" 
              onClick={handleScrollToTop}
              style={{ zIndex: 150 }}
            />
          </div>
        </div>

        {/* Chapter dropdown component */}
        {showChaptersButton && (
          <ChapterDropdown 
            chapters={chapters} 
            isOpen={dropdownOpen} 
            onClose={closeDropdown} 
            onSelectChapter={handleChapterSelect}
          />
        )}
      </>
    );
  }

  // Desktop header
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
              <span className="story-header-title">ARIA INGRAM'S DIARIES</span>
              <div className="chapter-title-mobile">
                  <span style={{ fontSize:"14px", color: '#FFFFFF', textAlign: 'left', display: 'block' }}>{title}</span>
              </div>
            </div>
            {showChaptersButton && (
              <img 
                src={BookIcon} 
                alt="Book" 
                className="story-nav-icon book-icon" 
                onClick={toggleDropdown}
              />
            )}
          </div>
        </div>
        
        <div className="story-header-right">
          <div className="social-icons-inline">
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
          
          <button
            className="story-nav-icon-container" 
            style={{ 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '50%',
              transition: 'background-color 0.2s',
              background: 'transparent',
              border: 'none',
              outline: 'none'
            }}
            onClick={handleScrollToTop}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(14, 219, 255, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            aria-label="Scroll to top"
          >
            <img 
              src={ChevronsUpIcon} 
              alt="Scroll to top" 
              className="story-nav-icon"
            />
          </button>
        </div>
      </div>

      {/* Chapter dropdown component */}
      {showChaptersButton && (
        <ChapterDropdown 
          chapters={chapters} 
          isOpen={dropdownOpen} 
          onClose={closeDropdown} 
          onSelectChapter={handleChapterSelect}
        />
      )}
    </>
  );
};

export default SimplifiedHeader;