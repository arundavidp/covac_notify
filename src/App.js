import React from "react";
import "./styles.css";

import Header from "./Header";

export default function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <h1>Get Notified for Vaccine Slots and Book Yours Quick</h1>
        <section className="App-Hero">
          <p className="App-Intro">
            Our project is to notify you and help to book a slot quick, but to
            get the vaccine you need to first register at the government
            website, with the link here
          </p>
          <div className="App-Register-Button">REGISTER FIRST</div>
          <p className="App-Sign-In-Intro">
            Once registered for vaccine, sign in to get notified
          </p>
          <div className="App-Sign-In-Button">SIGN IN</div>
          <div className="App-Sign-In-Hint">
            to check status and change search
          </div>
        </section>
      </main>
      <div className="App-More-Info-Container">
        <p className="App-More-Info-Text">
          Find the slot available at the earliest without constantly checking
          for it, and once you get notified about a free slot, book it as quick
          as you want.
        </p>
        <div className="App-How-It-Works-Container">
          <h3 className="App-How-It-Works-Heading">How it works</h3>
          <ol className="App-How-It-Works-Text">
            <li>
              Register with us using your mobile number which was used to
              registed at the Govt. website for getting the vaccine
            </li>
            <li>
              Select the state and districts where you want to look for vaccine
              centers with slot availability
            </li>
            <li>
              Get notified on mobile if a center in the district selected has
              slot availability
            </li>
            <li>
              Sign in again to see the slots listed on your status page and book
              for your slot
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
