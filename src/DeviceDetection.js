import { useState, useEffect } from 'react';

// Original mobile detection (keep for backwards compatibility)
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  return isMobile;
};

// Original media query (keep for content components)
export const useMobileMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 568px)');
    
    setIsMobile(mediaQuery.matches);
    
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    } 
    else {
      mediaQuery.addListener(handleMediaQueryChange);
      return () => mediaQuery.removeListener(handleMediaQueryChange);
    }
  }, []);
  
  return isMobile;
};

// NEW: Header-specific media query with 1200px breakpoint
export const useHeaderMediaQuery = () => {
  const [useHeaderMobile, setUseHeaderMobile] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1200px)');
    
    setUseHeaderMobile(mediaQuery.matches);
    
    const handleMediaQueryChange = (event) => {
      setUseHeaderMobile(event.matches);
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    } 
    else {
      mediaQuery.addListener(handleMediaQueryChange);
      return () => mediaQuery.removeListener(handleMediaQueryChange);
    }
  }, []);
  
  return useHeaderMobile;
};

// NEW: Header-specific media query with 1200px breakpoint
export const useSimpleHeaderMediaQuery = () => {
  const [useSimpleHeaderMobile, setUseSimpleHeaderMobile] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1050px)');
    
    setUseSimpleHeaderMobile(mediaQuery.matches);
    
    const handleMediaQueryChange = (event) => {
      setUseSimpleHeaderMobile(event.matches);
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    } 
    else {
      mediaQuery.addListener(handleMediaQueryChange);
      return () => mediaQuery.removeListener(handleMediaQueryChange);
    }
  }, []);
  
  return useSimpleHeaderMobile;
};