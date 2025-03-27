import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router-dom";
import App from "./App";
import LaunchGuard from "./LaunchGuard";
import ErrorBoundary from "./ErrorBonduary";
import reportWebVitals from "./reportWebVitals";

// Read the environment variable - this will be true if you have it in your .env file
const bypassCountdown = process.env.REACT_APP_BYPASS_COUNTDOWN === 'true';
console.log("Countdown bypass:", bypassCountdown); // For debugging

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        {bypassCountdown ? (
          // If bypass is true, render the app directly without the countdown
          <App />
        ) : (
          // Otherwise, wrap the app with the LaunchGuard
          <LaunchGuard>
            <App />
          </LaunchGuard>
        )}
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();