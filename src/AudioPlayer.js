import { useState, useEffect, useRef } from 'react';

const useAudioPlayer = (audioSrc) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    console.log("Audio source in useAudioPlayer:", audioSrc);
    
    if (!audioSrc) return;
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    audioRef.current.src = audioSrc;
    audioRef.current.preload = "metadata";
    setAudioLoaded(false);
    setIsPlaying(false);

    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setAudioLoaded(true);
      console.log("Audio loaded successfully, duration:", audio.duration);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e) => {
      console.error("Audio loading error:", e);
      setAudioLoaded(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioSrc]);

  const togglePlay = () => {
    console.log("Toggle play called, current state:", isPlaying, "Audio loaded:", audioLoaded);
    
    if (!audioRef.current) {
      console.error("Audio element not initialized");
      return;
    }
    
    if (isPlaying) {
      console.log("Pausing audio");
      audioRef.current.pause();
    } else {
      console.log("Playing audio");
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time) => {
    if (!audioRef.current || !audioLoaded) return;
    audioRef.current.currentTime = time;
  };

  return {
    isPlaying,
    duration,
    currentTime,
    audioLoaded,
    togglePlay,
    seek
  };
};

export default useAudioPlayer;