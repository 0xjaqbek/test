/**
 * This file contains code to help prevent users from accessing the app
 * before launch by using dev tools, with an added easter egg
 */

// Counter to detect dev tools opening
let devToolsCounter = 0;
let easterEggShown = false;

// Simple function to show the easter egg message in console
function showAriaMessage() {
  if (!easterEggShown) {
    easterEggShown = true;
    console.clear();
    
    // Simple ASCII art logo for Aria Ingram
    console.log(`
%c █████╗ ██████╗ ██╗ █████╗     
%c██╔══██╗██╔══██╗██║██╔══██╗    
%c███████║██████╔╝██║███████║    
%c██╔══██║██╔══██╗██║██╔══██║    
%c██║  ██║██║  ██║██║██║  ██║    
%c╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝    
`,
    'color: #0EDBFF;', 'color: #0EDBFF;', 'color: #0EDBFF;', 
    'color: #0EDBFF;', 'color: #0EDBFF;', 'color: #0EDBFF;');
    
    console.log(`
%c██╗███╗   ██╗ ██████╗ ██████╗  █████╗ ███╗   ███╗
%c██║████╗  ██║██╔════╝ ██╔══██╗██╔══██╗████╗ ████║
%c██║██╔██╗ ██║██║  ███╗██████╔╝███████║██╔████╔██║
%c██║██║╚██╗██║██║   ██║██╔══██╗██╔══██║██║╚██╔╝██║
%c██║██║ ╚████║╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║
%c╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝
`,
    'color: #FFA12B;', 'color: #FFA12B;', 'color: #FFA12B;', 
    'color: #FFA12B;', 'color: #FFA12B;', 'color: #FFA12B;');
    
    console.log("%cAria Ingram is synchronizing timelines...", 
                "color: #0EDBFF; font-size: 24px; font-weight: bold;");
    console.log("%cYou need to wait and be patient.", 
                "color: #FFA12B; font-size: 18px; font-weight: bold;");
    
    setTimeout(() => {
      console.log("%c\"Time is the longest distance between two places.\"", 
                  "color: white; font-style: italic; font-size: 16px;");
    }, 2000);
    
    setTimeout(() => {
      console.log("%cI see you're exploring my systems...", 
                  "color: #0EDBFF; font-size: 14px;");
    }, 4000);
    
    setTimeout(() => {
      console.log("%cTry typing: %cmoonstone%c, %caria%c, %csecret%c, %chack", 
                  "color: gray;",
                  "color: #0EDBFF;", "color: gray;",
                  "color: #0EDBFF;", "color: gray;",
                  "color: #0EDBFF;", "color: gray;",
                  "color: #0EDBFF;");
    }, 6000);
  }
}

// Add to the head of the document
export const addAntiDevToolsScript = () => {
  // Ensure we only add the script once
  if (document.getElementById('anti-devtools-script')) return;

  // Function to be executed when page loads
  const script = document.createElement('script');
  script.id = 'anti-devtools-script';
  script.innerHTML = `
    // Store the original console methods
    const originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error
    };
    
    // Keywords that trigger responses
    const ariaResponses = {
      'moonstone': 'The Moonstone holds the key to truth across all timelines.',
      'aria': 'I am Aria Ingram, navigator between dimensions.',
      'password': 'Access codes are earned, not given.',
      'hack': 'Attempting to breach the timeline may cause temporal instability.',
      'secret': 'Secrets are revealed only to those who truly understand.'
    };
    
    // Override console.log to detect keywords
    console.log = function(...args) {
      // Call original method
      originalConsole.log.apply(console, args);
      
      // Check first argument for keywords if it's a string
      if (typeof args[0] === 'string') {
        const input = args[0].toLowerCase();
        
        // Check each keyword
        Object.keys(ariaResponses).forEach(keyword => {
          if (input.includes(keyword)) {
            setTimeout(() => {
              originalConsole.log.call(
                console, 
                '%c[ARIA RESPONDS]: %c' + ariaResponses[keyword],
                'color: #0EDBFF; font-weight: bold;',
                'color: #FFA12B;'
              );
            }, 500);
          }
        });
      }
    };
    
    // Direct global keyword methods
    window.moonstone = function() {
      console.log('[ARIA RESPONDS]: The Moonstone holds the key to truth across all timelines.');
    };
    
    window.aria = function() {
      console.log('[ARIA RESPONDS]: I am Aria Ingram, navigator between dimensions coming to Your space-time.');
    };
    
    window.hack = function() {
      console.log('[ARIA RESPONDS]: Attempting to breach the timeline may cause temporal instability.');
    };
    
    window.secret = function() {
      console.log('[ARIA RESPONDS]: Secrets are revealed only to those who truly understand.');
    };
    
    window.password = function() {
      console.log('[ARIA RESPONDS]: Access codes are earned, not given.');
    };
    
    // Safely handle sessionStorage protection
    (function() {
      const originalSetItem = sessionStorage.setItem;
      const originalGetItem = sessionStorage.getItem;
      const originalRemoveItem = sessionStorage.removeItem;
      
      const secureKeys = ['app_launched'];
      const launchDate = new Date('2025-04-03T21:00:00+01:00');
      
      sessionStorage.setItem = function(key, value) {
        // If trying to modify our secure keys, check for tampering
        if (secureKeys.includes(key) && value === 'true') {
          const now = new Date();
          
          if (now < launchDate) {
            console.log('Launch date not reached');
            return;
          }
        }
        
        originalSetItem.call(sessionStorage, key, value);
      };
      
      sessionStorage.getItem = function(key) {
        return originalGetItem.call(sessionStorage, key);
      };
      
      sessionStorage.removeItem = function(key) {
        originalRemoveItem.call(sessionStorage, key);
      };
    })();
    
    // Monitor for DevTools
    let devToolsOpen = false;
    
    // Method 1: Detection via console.log
    const checkDevTools = function() {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      
      if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          // Show easter egg
          if (typeof showAriaMessage === 'function') {
            showAriaMessage();
          } else {
            console.log("%cAria Ingram is synchronizing timelines...", 
                       "color: #0EDBFF; font-size: 24px; font-weight: bold;");
          }
        }
      } else {
        devToolsOpen = false;
      }
    };
    
    // Check periodically
    setInterval(checkDevTools, 1000);
    
    // Method 2: Detection via debugger
    function detectDevTools() {
      const startTime = new Date();
      debugger;//TURNING OFF APP-CHECK CONSOLE!!! welcome curious adventurer
      const endTime = new Date();
      
      if (endTime - startTime > 100) {
        // Debugger was likely open
        if (typeof showAriaMessage === 'function') {
          showAriaMessage();
        }
      }
    }
    
    // Check occasionally
    setInterval(detectDevTools, 5000);
  `;
  
  // Append script to document head
  document.head.appendChild(script);
  
  // Make the message function globally available
  window.showAriaMessage = showAriaMessage;
};

// Call the function to setup dev tools protection
export const setupDevToolsProtection = () => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  // Prevent multiple additions
  if (document.getElementById('anti-devtools-script')) return;
  
  // Add the anti-dev tools script
  addAntiDevToolsScript();
  
  // Make keyword functions available globally
  window.moonstone = function() {
    console.log('[ARIA RESPONDS]: The Moonstone holds the key to truth across all timelines.');
  };
  
  window.aria = function() {
    console.log('[ARIA RESPONDS]: I am Aria Ingram, navigator between dimensions.');
  };
  
  window.hack = function() {
    console.log('[ARIA RESPONDS]: Attempting to breach the timeline may cause temporal instability.');
  };
  
  window.secret = function() {
    console.log('[ARIA RESPONDS]: Secrets are revealed only to those who truly understand.');
  };
  
  window.password = function() {
    console.log('[ARIA RESPONDS]: Access codes are earned, not given.');
  };
  
  // Setup protection against direct DOM manipulation
  const observer = new MutationObserver((mutations) => {
    try {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check if someone is trying to remove our LaunchGuard
          const guardRemoved = Array.from(mutation.removedNodes).some(
            node => node.classList && node.classList.contains('launch-guard')
          );
          
          if (guardRemoved) {
            devToolsCounter++;
            if (devToolsCounter > 2) {
              // Show easter egg instead of refreshing
              if (window.showAriaMessage) {
                window.showAriaMessage();
              }
            }
          }
        }
      });
    } catch (e) {
      console.error('Error in mutation observer:', e);
    }
  });
  
  // Start observing the document
  try {
    observer.observe(document.body, { 
      childList: true,
      subtree: true
    });
  } catch (e) {
    console.error('Failed to start mutation observer:', e);
  }
};

// Create a named object before exporting as default
const ObfuscationHelper = {
  addAntiDevToolsScript,
  setupDevToolsProtection
};

export default ObfuscationHelper;