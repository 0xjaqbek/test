import React, { useState, useEffect } from 'react';
import useAudioPlayer from './AudioPlayer';
import PlayCircle from './Asets/PlayCircle.svg';
import PauseCircle from './Asets/PauseCircle.svg'; 

const createGlobalToast = (title, isPlaying, isDesktop) => {
  // Remove any existing toast first
  const existingToast = document.getElementById('global-audio-toast');
  if (existingToast) {
    document.body.removeChild(existingToast);
  }
  
  // Create a new toast element
  const toast = document.createElement('div');
  toast.id = 'global-audio-toast';
  
  // Use your existing CSS classes
  toast.className = `audio-toast ${isDesktop ? 'desktop-toast' : ''}`;
  
  // Set the message with the same structure as your React component
  // Use nbsp for a guaranteed space after the colon
  const statusText = isPlaying ? 'Now playing:&nbsp;' : 'Paused:&nbsp;';
  toast.innerHTML = `<div class="audio-toast-content">
                       ${statusText}
                       <span class="audio-title">${title}</span>
                     </div>`;
  
  // Add to body
  document.body.appendChild(toast);
  
  // After 2.7 seconds, add hiding class (matches your React component timing)
  setTimeout(() => {
    if (document.body.contains(toast)) {
      toast.classList.add('hiding');
    }
  }, 2700);
  
  // Remove after animation completes
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, 3000);
};

const AudioToast = ({ isPlaying, title, onClose, className }) => {
    const [visible, setVisible] = useState(true);
    const [hiding, setHiding] = useState(false);
    const isDesktop = className && className.includes('desktop-toast');
  
    useEffect(() => {
      setVisible(true);
      setHiding(false);
      
      const hideTimer = setTimeout(() => {
        setHiding(true);
      }, 2700);
      
      const closeTimer = setTimeout(() => {
        const delay = isDesktop ? 500 : 300;
        setTimeout(() => setVisible(false), delay);
        if (onClose) onClose();
      }, 3000);
      
      return () => {
        clearTimeout(hideTimer);
        clearTimeout(closeTimer);
      };
    }, [isPlaying, onClose, isDesktop]);
  
    if (!visible) return null;
  
    return (
      <div className={`audio-toast ${className || ''} ${hiding ? 'hiding' : ''}`}>
        <div className="audio-toast-content">
          {isPlaying ? 'Now playing:\u00A0' : 'Paused:\u00A0'}
          <span className="audio-title">{title}</span>
        </div>
      </div>
    );
};
  
const AudioControl = ({ audioSrc, chapterTitle, className }) => {
  const [showToast, setShowToast] = useState(false);
  const { isPlaying, audioLoaded, togglePlay } = useAudioPlayer(audioSrc);
  const isDesktop = className && className.includes('story-nav-icon');

  const handleTogglePlay = () => {
    console.log("Audio source:", audioSrc);
    console.log("Chapter title:", chapterTitle);
    console.log("Is desktop:", isDesktop);
    console.log("Toast class:", isDesktop ? 'desktop-toast' : '');
    
    if (audioSrc) {
      togglePlay();
      
      // Use the direct DOM method for desktop version
      if (isDesktop) {
        // Need to use !isPlaying because the state hasn't updated yet
        // Add a space to the beginning of the title to ensure proper spacing
        createGlobalToast(chapterTitle, !isPlaying, isDesktop);
      } else {
        // Use the React component for mobile as it's already working
        setShowToast(true);
      }
      
      console.log("Toast visibility triggered");
    } else {
      console.error("No audio source provided for this chapter");
    }
  };

  return (
    <>
      <div 
        className={className}
        onClick={handleTogglePlay}
        style={{ 
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: 0
        }}
      >
        <img 
          src={isPlaying ? PauseCircle : PlayCircle}
          alt={isPlaying ? "Pause Audio" : "Play Audio"}
          style={{
            width: '100%',
            height: '100%',
            opacity: audioSrc ? 1 : 0.5
          }}
        />
      </div>
      
      {showToast && (
        <AudioToast 
          isPlaying={isPlaying} 
          title={chapterTitle}  // Remove the extra space
          onClose={() => setShowToast(false)}
          className={isDesktop ? 'desktop-toast' : ''}
        />
      )}
    </>
  );
};
  
export default AudioControl;