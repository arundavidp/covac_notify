import React from "react";
import "./styles.css";

import Header from "./Header";

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <Header />
      <main>
        <form>
          <div className="Dashboard-User-Container">
            <div className="Dashboard-Field-Container">
              <label>
                <h4>Your email to get notified for vaccine slots?</h4>
                <div className="Dashboard-Field">
                  <input type="text" />
                </div>
              </label>
            </div>
          </div>
          <div className="Dashboard-Hero">
            <div className="Dashboard-Field-Container">
              <label>
                <h4>Select the state where you reside?</h4>
                <div className="Dashboard-Field">
                  <select defaultValue="punjab">
                    <option value="kerala">Kerala</option>
                    <option value="punjab">Punjab</option>
                    <option value="tamilnadu">Tamil Nadu</option>
                  </select>
                </div>
              </label>
            </div>
            <div className="Dashboard-Field-Container">
              <label>
                <h4>
                  Select the district where you want to look for vaccine slot?
                </h4>
                <div className="Dashboard-Field">
                  <select defaultValue="wayanad">
                    <option value="ernakulam">Ernakulam</option>
                    <option value="trivandrum">Trivandrum</option>
                    <option value="wayanad">Wayanad</option>
                  </select>
                </div>
              </label>
            </div>
            <div className="Dashboard-Field-Container">
              <label>
                <h4>
                  How many slots need to be free in a center for you to get
                  notified?
                </h4>
                <div className="Dashboard-Field">
                  <select className="Dashboard-Field-Number" defaultValue="2">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="2+">2+</option>
                  </select>
                </div>
              </label>
            </div>
            <div type="submit" className="Dashboard-Notify-Button Btn">
              NOTIFY ME IN EMAIL
            </div>
          </div>
        </form>
      </main>
      <div className="Dashboard-Status-Container">
        <h2 className="Dashboard-Status-Header">Status</h2>
      </div>
    </div>
  );
}
