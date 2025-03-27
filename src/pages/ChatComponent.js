import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMobileMediaQuery } from "../DeviceDetection";
import "./chat.css";
import "./MobileChat.css";
import ariaIcon from "../Asets/ariaChatIcon.png";
import userIcon from "../Asets/userChatIcon.png";
import upScrollIcon from "../Asets/upScroll.svg";
import HomeIcon from "../Asets/Home.svg";
import BookIcon from "../Asets/Book.svg";
import SocialIconsX from "../Asets/SocialIconsX.svg";
import SocialIconsTelegram from "../Asets/SocialIconsTelegram.svg";
import SocialIconsTT from "../Asets/SocialIconsTT.svg";
import Manifold from "../Asets/manifold.svg";
import SocialIconsInstagram from "../Asets/Instagram.svg";
import SimplifiedHeader from "./SimplifiedHeader";

// Main Chat component that handles shared state
const ChatComponent = () => {
  // Shared state between desktop and mobile views
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messagePositions, setMessagePositions] = useState({});
  const [inputError, setInputError] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  const messageRefs = useRef({});
  const chatWrapperRef = useRef(null);
  const mobileWrapperRef = useRef(null);
  const lastMessageRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobileMediaQuery();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      // Immediate scroll attempt
      if (isMobile && mobileWrapperRef.current) {
        mobileWrapperRef.current.scrollTop = mobileWrapperRef.current.scrollHeight;
      } else if (chatWrapperRef.current) {
        chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
      }
      
      // Second scroll attempt after a slight delay to ensure DOM is fully updated
      setTimeout(() => {
        if (isMobile && mobileWrapperRef.current) {
          mobileWrapperRef.current.scrollTop = mobileWrapperRef.current.scrollHeight;
        } else if (chatWrapperRef.current) {
          chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
        }
      }, 100);
    };

    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isMobile]);

  useEffect(() => {
    if (messages.length === 0) return;
    
    const updatePositions = () => {
      let currentTop = 10;
      const newPositions = {};
      
      messages.forEach((message) => {
        const messageId = message.id;
        const messageElement = messageRefs.current[messageId];
        
        newPositions[messageId] = currentTop;
        
        if (messageElement) {
          const height = messageElement.offsetHeight;
          currentTop += height - 15; // Overlap
        } else {
          currentTop += 105; // Default height estimate
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
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check the URL hash for chapter information
  useEffect(() => {
    // If the URL has a hash (e.g. /chat#2), it means we came from a chapter
    const hash = location.hash.replace('#', '');
    if (hash && !isNaN(parseInt(hash))) {
      // We could do something special based on the chapter the user came from
      console.log(`User navigated from chapter ${hash}`);
    }
  }, [location]);

  const scrollToTop = () => {
    const chatWrapper = document.querySelector('.chat-wrapper');
    if (chatWrapper) {
      chatWrapper.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleNavigate = () => {
    navigate("/story");
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
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
          senderName: "Aria",
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
    setInputError("");

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
        `But don't worry, I've managed to transcode some of my diaries so you can go directly to read them.`,
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

  useEffect(() => {
    // Fix for iOS-specific scroll issues
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS && isMobile) {
      // Prevent body scrolling but allow chat scrolling
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Prevent touchmove events on body from interfering with our chat scroll
      const handleBodyTouchMove = (e) => {
        // Only if the touch is outside our scroll container
        if (!mobileWrapperRef.current?.contains(e.target)) {
          e.preventDefault();
        }
      };
      
      document.body.addEventListener('touchmove', handleBodyTouchMove, { passive: false });
      
      // Clean up on unmount
      return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.removeEventListener('touchmove', handleBodyTouchMove);
      };
    }
  }, [isMobile]);
  
  // Modified auto-scroll function with iOS-specific handling
  useEffect(() => {
    const scrollToBottom = () => {
      if (isMobile && mobileWrapperRef.current) {
        // For iOS, we need to be more specific with scroll positioning
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        if (isIOS) {
          const scrollHeight = mobileWrapperRef.current.scrollHeight;
          const containerHeight = mobileWrapperRef.current.clientHeight;
          const maxScrollTop = scrollHeight - containerHeight;
          
          // Set scroll with animation
          mobileWrapperRef.current.scrollTo({
            top: maxScrollTop + 100, // Add some extra space to ensure we reach bottom
            behavior: 'smooth'
          });
          
          // iOS sometimes needs a second attempt
          setTimeout(() => {
            if (mobileWrapperRef.current) {
              mobileWrapperRef.current.scrollTop = mobileWrapperRef.current.scrollHeight;
            }
          }, 100);
        } else {
          // Regular Android scrolling
          mobileWrapperRef.current.scrollTop = mobileWrapperRef.current.scrollHeight;
        }
      } else if (chatWrapperRef.current) {
        // Desktop scrolling
        chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
      }
    };
  
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isMobile]);
  
  // Render either mobile or desktop view based on screen size
  return isMobile ? (
    // Mobile View
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
            <a href="https://manifold.xyz/" target="_blank" rel="noopener noreferrer">
              <img src={Manifold} alt="Manifold" className="mobile-social-icon" />
            </a>
          </div>
        </div>
      </div>
    
      <div className="mobile-chat-wrapper" ref={mobileWrapperRef} data-ios-scroll="true">
        <div className="mobile-message-container" style={{ overflow: 'visible' }}>
          {messages.map((message, index) => {
            const messageId = message.id;
            const isLastMessage = index === messages.length - 1;
            
            return (
                <div
                className={`mobile-message ${
                  message.placement === "left" ? "mobile-left-message" : "mobile-right-message"
                }`}
                key={messageId}
                ref={el => {
                  messageRefs.current[messageId] = el;
                  if (isLastMessage) lastMessageRef.current = el;
                }}
                style={{
                  '--message-index': index,
                  marginTop: index === 0 ? '20px' : '-5px', // First message needs normal margin
                  marginBottom: index === messages.length - 1 ? '170px' : undefined, // Add margin to last message
                  position: 'relative',
                  zIndex: 1 + index // Higher index = lower layer
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
  ) : (
    // Desktop View
    <>
      <SimplifiedHeader 
        scrollToTop={scrollToTop} 
        title="LIVE CHAT" 
        showChaptersButton={true}
      />
      <div className="chat-wrapper" ref={chatWrapperRef}>
      <div className="message-container" style={{ overflow: 'visible' }}>
          {messages.map((message, index) => {
            const messageId = message.id;
            const isLastMessage = index === messages.length - 1;
            
            const isEven = index % 2 === 0;
            
            return (
                <div
                className={`message ${
                  message.placement === "left" ? "left-message" : ""
                }`}
                key={messageId}
                ref={el => {
                  messageRefs.current[messageId] = el;
                  if (isLastMessage) lastMessageRef.current = el;
                }}
                style={{ 
                    '--n': index + 1,
                    zIndex: 1 + index, // Higher index = lower layer
                    position: 'absolute',
                    width: isEven ? '450px' : '460px', // Different widths for even/odd messages
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: `${messagePositions[messageId] || 20 + (index * 105)}px`,
                  }}

              >
                <div className="message-header">
                  <img
                    src={message.placement === "left" ? ariaIcon : userIcon}
                    className="profile-img"
                    alt="User Icon"
                  />
                  {message.senderName}
                </div>
                <div>
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

        <div className={`input-box ${inputDisabled ? "disabled-box" : ""}`}>
          <input
            className={`input ${
              inputDisabled ? "input-disabled" : "input-active"
            }`}
            type="text"
            placeholder={
              inputDisabled
                ? "Chat function got disabled."
                : "Type your name ....."
            }
            value={inputValue}
            onKeyDown={handleKeyPress}
            onChange={handleNameChange}
            disabled={inputDisabled}
            maxLength={12}
          />
          {inputError && <div className="input-error">{inputError}</div>}
          <button
            className="input-button"
            onClick={inputDisabled ? handleNavigate : handleSaveName}
          >
            {inputDisabled ? "Enter story" : "Enter"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;