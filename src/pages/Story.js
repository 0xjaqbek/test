import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./story.css";
import StoryHeader from "./StoryHeader";
import chapters from "./chapters";
import upScrollIcon from "../Asets/upScroll.svg";

const Story = ({ useHeaderMobile = false }) => {
  const [currentChapter, setCurrentChapter] = useState("1");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contentRef = useRef(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    try {
      // Try smooth scrolling first
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } catch (error) {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
  };

  const changeChapter = (chapter) => {
    setCurrentChapter(chapter);
    scrollToTop();
  };

  const mint = (chapter) => {
    window.open(`https://example.com/${chapter}`, "_blank");
  };

  const getBannerSrc = () => {
    const bannerPath = chapters[currentChapter].banner;
    
    try {
      const bannerFileName = bannerPath.replace('../Asets/', '');
      return require(`../Asets/${bannerFileName}`);
    } catch (error) {
      console.error('Error loading banner image:', error);
      return null;
    }
  };
  
  const getNftSrc = () => {
    const nftPath = chapters[currentChapter].nft;
    
    try {
      const nftFileName = nftPath.replace('../Asets/', '');
      return require(`../Asets/${nftFileName}`);
    } catch (error) {
      console.error('Error loading NFT image:', error);
      return null;
    }
  };

  return (
    <>
      <StoryHeader 
        scrollToTop={scrollToTop} 
        currentChapter={currentChapter} 
        chapterTitle={chapters[currentChapter].title} 
        onChangeChapter={changeChapter}
        useHeaderMobile={useHeaderMobile}
      />
      
      {/* The banner container class automatically adjusts to header height */}
      <div className="banner-container">
        <img 
          src={getBannerSrc()} 
          alt={`Chapter ${currentChapter} banner`} 
          className="banner-img" 
        />
      </div>
      
      <div className="nft-content">
        <div className="nft-img-wrapper shine">
          <img 
            src={getNftSrc()} 
            alt={`Chapter ${currentChapter} NFT`} 
            className="nft-img" 
          />
        </div>
        <div className="nft-text-container">
          <h1 className="nft-title-h1">
            {chapters[currentChapter]["nft-title-h1"].split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < chapters[currentChapter]["nft-title-h1"].split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <h2 className="nft-title-h2">{chapters[currentChapter]["nft-title-h2"]}</h2>
          <button className="mint-button" onClick={() => mint(currentChapter)}>
            Buy NOW
          </button>
        </div>
      </div>
      
      <div className="plot-big-container" ref={contentRef}>
        <div className="plot-container">
          
        <p className="plot-summary">
            {chapters[currentChapter].plot.split('\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                <br /><br />
              </React.Fragment>
            ))}
        </p>
          
          <p className="plot">
            {chapters[currentChapter].content.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
      <br></br>
      <div className="nft-content">
        <div className="nft-img-wrapper shine">
          <img 
            src={getNftSrc()} 
            alt={`Chapter ${currentChapter} NFT`} 
            className="nft-img" 
          />
        </div>
        <div className="nft-text-container">
          <h1 className="nft-title-h1-bottom">
            {chapters[currentChapter]["nft-title-h1-bottom"].split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < chapters[currentChapter]["nft-title-h1-bottom"].split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <h2 className="nft-title-h2-bottom">{chapters[currentChapter]["nft-title-h2-bottom"]}</h2>
          <button className="mint-button" onClick={() => mint(currentChapter)}>
            Buy NOW
          </button>
        </div>
      </div>

      {useHeaderMobile && showBackToTop && (
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
    </>
  );
};

export default Story;