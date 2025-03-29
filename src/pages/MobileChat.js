import "./MobileChat.css";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../Asets/Home.svg";
import BookIcon from "../Asets/Book.svg"; 
import SocialIconsX from "../Asets/SocialIconsX.svg";
import SocialIconsTelegram from "../Asets/SocialIconsTelegram.svg";
import SocialIconsTT from "../Asets/SocialIconsTT.svg";
import Manifold from "../Asets/manifold.svg";
import SocialIconsInstagram from "../Asets/Instagram.svg";
import ariaIcon from "../Asets/ariaChatIcon.png";
import userIcon from "../Asets/userChatIcon.png";
import upScrollIcon from "../Asets/upScroll.svg";

const MobileChat = () => {
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messagePositions, setMessagePositions] = useState({});
  const [inputError, setInputError] = useState("");
  const messageRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    if (messages.length === 0) return;
    
    const updatePositions = () => {
      let currentTop = 100; 
      const newPositions = {};
      
      messages.forEach((message) => {
        const messageId = message.id;
        const messageElement = messageRefs.current[messageId];
        
        newPositions[messageId] = currentTop;
        
        if (messageElement) {
          const height = messageElement.offsetHeight;
          currentTop += height - 15; 
        } else {
          currentTop += 105; 
        }
      });
      
      setMessagePositions(newPositions);
    };
    
    updatePositions();
    
    const timer = setTimeout(updatePositions, 100); 
    
    return () => clearTimeout(timer);
  }, [messages]);

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavigate = () => {
    navigate("/story");
  };

  const navigateToStory = () => {
    navigate("/story");
  };

  const toggleInput = () => {
    setInputDisabled((prev) => !prev);
  };

  const handleNameChange = (e) => {
    setInputValue(e.target.value);
    // Clear error when user starts typing again
    if (inputError) {
      setInputError("");
    }
  };

  // Validate name
  const validateName = (name) => {
    if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
    if (name.length > 12) {
      return "Name cannot be longer than 12 characters";
    }
    return "";
  };

  const handleSaveName = () => {
    // Validate the name before processing
    const error = validateName(inputValue);
    if (error) {
      setInputError(error);
      return;
    }

    localStorage.setItem("userName", inputValue);
    setUserName(inputValue);
    setInputValue("");

    setTimeout(() => {
      handleSendMessage(`My name is ${inputValue}.`, inputValue);
    }, 200);

    setTimeout(() => {
      simulateTyping(`What a wonderful name, ${inputValue}!`, 1500);
    }, 1000);

    setTimeout(() => {
      simulateTyping(
        "As you've realized, our timelines haven't fully aligned yet, which is why we can't have a live conversation just yet.",
        2000
      );
    }, 3500);

    setTimeout(() => {
      simulateTyping(
        `But don't worry, I've managed to transcode some of my diaries so you can go directly to read`,
        1600
      );
    }, 7000);

    setTimeout(() => {
      simulateTyping("I'm disabling the chat feature.", 900);
    }, 9000);

    setTimeout(() => {
      toggleInput();
    }, 1000);
  };

  const handleSendMessage = (messageTxt, messageSender, messagePlacement = "right") => {
    // If this is Aria's message (left placement), use typing animation
    if (messagePlacement === "left") {
      simulateTyping(messageTxt, 1500); // Use typing animation with 1.5 second delay
      return;
    }
    
    // For user messages, add them directly (no typing animation)
    const newMessageId = Date.now() + Math.random().toString(36).substr(2, 5);
    
    const newMessageObject = {
      id: newMessageId,
      senderName: messageSender,
      text: messageTxt,
      placement: messagePlacement,
      timestamp: Date.now()
    };
    
    setMessages(prevMessages => {
      const isDuplicate = prevMessages.some(msg => 
        msg.text === messageTxt && 
        msg.senderName === messageSender &&
        msg.placement === messagePlacement
      );
      
      return isDuplicate ? prevMessages : [...prevMessages, newMessageObject];
    });
    
    setInputValue("");
  };

  const simulateTyping = (message, delay) => {
    // Create a unique ID for the typing message
    const typingId = "typing-" + Date.now() + Math.random().toString(36).substr(2, 5);
    
    // Add the typing indicator message, but first remove any existing typing indicators
    setMessages(prevMessages => {
      // Filter out any existing typing indicators
      const messagesWithoutTyping = prevMessages.filter(msg => !msg.isTyping);
      
      // Add the new typing indicator
      return [
        ...messagesWithoutTyping,
        {
          id: typingId,
          senderName: "ARIA",
          placement: "left",
          isTyping: true,
          timestamp: Date.now()
        }
      ];
    });
  
    // After the delay, replace the typing indicator with the actual message
    setTimeout(() => {
      setMessages(prevMessages => {
        // Check if this message already exists
        const messageExists = prevMessages.some(msg => 
          !msg.isTyping && msg.text === message && msg.placement === "left"
        );
        
        // Remove ALL typing indicators to be safe
        const messagesWithoutTyping = prevMessages.filter(msg => !msg.isTyping);
        
        // Only add the new message if it doesn't already exist
        if (messageExists) {
          return messagesWithoutTyping;
        }
        
        // Add the actual message
        return [
          ...messagesWithoutTyping,
          {
            id: Date.now() + Math.random().toString(36).substr(2, 5),
            senderName: "Aria",
            text: message,
            placement: "left",
            timestamp: Date.now()
          }
        ];
      });
    }, delay);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSaveName();
    }
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
      setInputDisabled(true);
      
      // Clear any existing messages first to prevent duplicates on remount
      setMessages([]);
      
      // Delay slightly to ensure state is cleared
      setTimeout(() => {
        // Use simulateTyping for all Aria's messages
        simulateTyping(`${storedUserName}, I'm just as excited as you are! Though we can't have a real-time conversation yet.`, 1500);
        
        // Add second message with longer delay
        setTimeout(() => {
          simulateTyping("But don't worry, until that moment arrives, you can explore my diaries and uncover the secrets of my journey.", 2500);
        }, 4000); // Wait for the first message to complete
      }, 100);
    } else {
      // First-time user - use simulateTyping
      simulateTyping(
        `It's my pleasure to finally meet you. May I ask, how should I address you?`,
        1200
      );
    }
  }, []);
  

  return (
    <div className="mobile-chat-container">
      <div className="mobile-chat-header">
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
                <span style={{ color: '#FFFFFF', textAlign: 'left', display: 'block' }}>LIVE CHAT</span>
              </div>
          </div>
          </div>
          
          <div className="header-right">
            <img 
              src={BookIcon} 
              alt="Story" 
              className="nav-icon" 
              onClick={navigateToStory}
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
        </div>
      </div>
    
      <div className="mobile-chat-wrapper">
      <div className="mobile-message-container">
        {messages.map((message, index) => {
          const messageId = message.id;
          
          return (
            <div
            className={`mobile-message ${
              message.placement === "left" ? "mobile-left-message" : "mobile-right-message"
            }`}
            key={messageId}
            ref={el => messageRefs.current[messageId] = el}
            style={{
              '--message-index': index,
              marginTop: index === 0 ? '20px' : '-5px' 
            }}
              
            >
              <div className="mobile-message-header">
                <img
                  src={message.placement === "left" ? ariaIcon : userIcon}
                  className="profile-img"
                  alt="User Icon"
                />
                {message.senderName}
              </div>
              <div className="mobile-message-content">
                {message.isTyping ? (
                  <div className="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  message.text
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
      <div className={`mobile-input-box ${inputDisabled ? "mobile-disabled-box" : ""}`}>
        <input
          className={`mobile-input ${
            inputDisabled ? "mobile-input-disabled" : "mobile-input-active"
          } ${inputError ? "error" : ""}`}
          type="text"
          placeholder={
            inputDisabled
              ? "Chat function got disabled."
              : "type your name ....."
          }
          value={inputValue}
          onKeyDown={handleKeyPress}
          onChange={handleNameChange}
          disabled={inputDisabled}
          maxLength={12}
        />
        {inputError && <div className="mobile-input-error">{inputError}</div>}
        <button
          className="mobile-input-button"
          onClick={inputDisabled ? handleNavigate : handleSaveName}
        >
          {inputDisabled ? "Enter story" : "Enter"}
        </button>
      </div>

      {showBackToTop && (
        <button className="mobile-back-to-top" onClick={scrollToTop}>
            <img src={upScrollIcon} alt="Back to top" />
        </button>
      )}
    </div>
  );
};

export default MobileChat;