import React, { useRef, useEffect } from 'react';
import "./storyMobile.css";

const MobileRozdzialNav = ({ currentChapter, chapters, onSelectChapter, onClose }) => {
  const navContainerRef = useRef(null);
  
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);
  
  return (
    <div className="mobile-nav-overlay">
      <div className="mobile-nav-container" ref={navContainerRef}>
        <div className="mobile-nav-header">
          <h2>DZIENNIK ARII INGRAM</h2>
          <button className="close-nav" onClick={onClose}>✕</button>
        </div>
        
        <div className="mobile-chapters-list">
          {Object.keys(chapters).map(key => {
            const chapter = chapters[key];
            if (chapter.published) {
              return (
                <div 
                  key={key} 
                  className={`mobile-chapter-item ${currentChapter === key ? 'active' : ''}`}
                  onClick={() => onSelectChapter(key)}
                >
                  <div className="chapter-number">ROZDZIAŁ {chapter.id}</div>
                  <div className="chapter-title">{chapter.title.toUpperCase()}</div>
                </div>
              );
            }
            return null;
          })}
          
          {Object.keys(chapters).some(key => !chapters[key].published) && (
            <div className="mobile-coming-soon-header">
              <div className="mobile-coming-soon-text">Więcej wkrótce...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileRozdzialNav;