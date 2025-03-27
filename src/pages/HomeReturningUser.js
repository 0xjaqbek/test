import "./page.css";

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const HomeReturningUser = (props) => {
  const [name, setName] = useState(props.userName);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (messageTxt, messageSender, messagePlacement) => {
    const newMessageObject = {
      id: Date.now(),
      senderName: messageSender,
      text: messageTxt,
      time: new Date(Date.now()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      placement: messagePlacement,
    };
    setMessages((prev) => [...prev, newMessageObject]);
    setInputValue("");
  };

  useEffect(() => {
    handleSendMessage(`Welcome back, ${name}!`, "Aria", "left");
    handleSendMessage(
      `As you've realized, our timelines haven’t fully aligned yet, which is
        why we can’t have a live conversation just yet.`,
      "Aria",
      "left"
    );
    handleSendMessage(
      `But don’t worry, I’ve managed to transcode some of my diaries so you can
        tune in to my history.`,
      "Aria",
      "left"
    );
    handleSendMessage(
      `And before you go, remember that you can find more information about my
        universe by following my media.`,
      "Aria",
      "left"
    );
    handleSendMessage(
      <div>
        <h3>Choose a chapter to start reading:</h3>
        <Link to="/chapter1">
          <button>Chapter 1</button>
        </Link>
        <Link to="/chapter2">
          <button>Chapter 2</button>
        </Link>
        <Link to="/chapter3">
          <button>Chapter 3</button>
        </Link>
        <Link to="/chapter4">
          <button>Chapter 4</button>
        </Link>
        <Link to="/chapter5">
          <button>Chapter 5</button>
        </Link>
        <Link to="/chapter6">
          <button>Chapter 6</button>
        </Link>
        <Link to="/chapter7">
          <button>Chapter 7</button>
        </Link>
        <Link to="/chapter8">
          <button>Chapter 8</button>
        </Link>
      </div>,
      "Aria",
      "left"
    );
  }, []);

  return (
    <>
      <div className="message-box">
        {messages.map((message) => (
          <div
            className={`message ${
              message.placement === "left" ? "aria-message" : ""
            }`}
            key={message.id}
          >
            <div>
              {message.senderName} {message.time}
            </div>
            <div></div>
            <div>--------------</div>
            <div>{message.text}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeReturningUser;
