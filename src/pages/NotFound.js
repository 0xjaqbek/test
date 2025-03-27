import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notFoundContainer">
      <h1>
        <span className="highlight">404</span> You got lost.
      </h1>
      <p>The page you're looking for doesn't exist.</p>
      <h3>
        If you are thirsty for more inside stories, <br />
        check out our extra stories published on our X channel. <br /> Or, head
        back home:
      </h3>
      <Link to="/">
        <button className="button button2">Take Me Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
