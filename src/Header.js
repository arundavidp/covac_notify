import React from "react";
import "./styles.css";

export default function Header() {
  return (
    <header className="App-Header">
      <div className="App-Logo">
        <h2>COSOL</h2>
      </div>
      <div className="App-Navigation">
        <ul>
          <li>About Project</li>
        </ul>
      </div>
    </header>
  );
}
