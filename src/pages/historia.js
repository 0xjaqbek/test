import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./story.css";
import HistoriaHeader from "./historiaHeader";
import rozdzialy from "./rozdzialy";
import PasswordGate from "./PasswordGate";
import upScrollIcon from "../Asets/upScroll.svg";

const Historia = ({ useHeaderMobile = false }) => {
  const [currentChapter, setCurrentChapter] = useState("1");
  const [passwordAccepted, setPasswordAccepted] = useState(false);
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
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  };

  const handlePasswordAccepted = () => {
    setPasswordAccepted(true);
  };

  const changeChapter = (chapter) => {
    setCurrentChapter(chapter);
    scrollToTop();
  };

  const mint = (chapter) => {
    window.open(`https://example.com/${chapter}`, "_blank");
  };

  const getBannerSrc = () => {
    const bannerPath = rozdzialy[currentChapter].banner;
    
    try {
      const bannerFileName = bannerPath.replace('../Asets/', '');
      return require(`../Asets/${bannerFileName}`);
    } catch (error) {
      console.error('Error loading banner image:', error);
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
    <>
      <HistoriaHeader 
        scrollToTop={scrollToTop} 
        currentChapter={currentChapter} 
        chapterTitle={rozdzialy[currentChapter].title} 
        onChangeChapter={changeChapter}
        chapters={rozdzialy}
        useHeaderMobile={useHeaderMobile}
      />
      
      <div className="banner-container">
        <img 
          src={getBannerSrc()} 
          alt={`Rozdział ${currentChapter} baner`} 
          className="banner-img" 
        />
      </div>
      
      <div className="nft-container">
        <div className="nft-content">
          <img 
            src={getNftSrc()} 
            alt={`Rozdział ${currentChapter} NFT`} 
            className="nft-img" 
          />
          <div className="nft-text-container">
            <h1 className="nft-title-h1">
              {rozdzialy[currentChapter]["nft-title-h1"].split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < rozdzialy[currentChapter]["nft-title-h1"].split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <h2 className="nft-title-h2">{rozdzialy[currentChapter]["nft-title-h2"]}</h2>
            <button className="mint-button" onClick={() => mint(currentChapter)}>
              Kup TERAZ
            </button>
          </div>
        </div>
      </div>
      
      <div className="plot-big-container" ref={contentRef}>
        <div className="plot-container">
          
          <p className="plot-summary">
            {rozdzialy[currentChapter].plot.split('\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                <br /><br />
              </React.Fragment>
            ))}
          </p>
          
          <p className="plot">
            {rozdzialy[currentChapter].content.split("\n").map((line, index) => (
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
      <div className="nft-container">
        <div className="nft-content">
          <img 
            src={getNftSrc()} 
            alt={`Rozdział ${currentChapter} NFT`} 
            className="nft-img" 
          />
          <div className="nft-text-container">
            <h1 className="nft-title-h1-bottom">
              {rozdzialy[currentChapter]["nft-title-h1-bottom"].split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < rozdzialy[currentChapter]["nft-title-h1-bottom"].split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <h2 className="nft-title-h2-bottom">{rozdzialy[currentChapter]["nft-title-h2-bottom"]}</h2>
            <button className="mint-button" onClick={() => mint(currentChapter)}>
              Kup TERAZ
            </button>
          </div>
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

export default Historia;