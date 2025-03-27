import React, { useRef, useEffect } from 'react';
import "./ChapterDropdown.css";

const ChapterDropdown = ({ chapters, isOpen, onClose, onSelectChapter }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      className={`chapter-dropdown-overlay ${isOpen ? 'open' : ''}`}
    >
      <div className="chapter-dropdown-container" ref={containerRef}>
        <div className="chapter-dropdown-header">
          <h2>ARIA INGRAM'S DIARIES</h2>
          <div className="close-button" onClick={onClose}>✕</div>
        </div>
        <div className="chapter-dropdown-content">
          {Object.keys(chapters).map(key => {
            const chapter = chapters[key];
            if (chapter.published) {
              return (
                <div 
                  key={key} 
                  className="chapter-item"
                  onClick={() => {
                    onSelectChapter(key);
                    onClose();
                  }}
                >
                  <div className="chapter-number">CHAPTER {chapter.id}</div>
                  <div className="chapter-title">{chapter.title.toUpperCase()}</div>
                </div>
              );
            }
            return null;
          })}
          
          {Object.keys(chapters).some(key => !chapters[key].published) && (
            <div className="coming-soon-header">
              <div className="coming-soon-text">More coming soon...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterDropdown;