import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Story from "./pages/Story";
import Historia from "./pages/historia";
import StoryMobile from "./pages/storyMobile";
import HistoriaMobile from "./pages/historiaMobile";
import NotFound from "./pages/NotFound";
import { useMobileMediaQuery, useHeaderMediaQuery } from "./DeviceDetection";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const isStoryPage = location.pathname === "/story" || location.pathname === "/story/PL";
  
  // Use both media queries - one for content, one for headers
  const isMobile = useMobileMediaQuery(); // 768px breakpoint for content
  const useHeaderMobile = useHeaderMediaQuery(); // 1200px breakpoint for headers

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className="app-container">    
        <div className="app-croped">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route 
              path="/story" 
              element={
                isMobile ? (
                  <StoryMobile />
                ) : (
                  <Story useHeaderMobile={useHeaderMobile} />
                )
              } 
            />
            <Route 
              path="/story/PL" 
              element={
                isMobile ? (
                  <HistoriaMobile />
                ) : (
                  <Historia useHeaderMobile={useHeaderMobile} />
                )
              } 
            />
            <Route path="/rozdzialy" element={isMobile ? <HistoriaMobile /> : <Historia useHeaderMobile={useHeaderMobile} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;