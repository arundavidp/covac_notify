import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import firebase from "@firebase/app";
import db from "./firebase";

import Header from "./Header";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [inStates, setInStates] = useState([]);
  const [selectedState, setSelectedState] = useState(1);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInStateSelection = (event) => {
    event.preventDefault();
    setSelectedState(event.target.value);
  };

  const handleDistrictSelection = (event) => {
    event.preventDefault();
    setSelectedDistrict(event.target.value);
  };

  const handleEmailInput = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(event.target["email"].value);
    // check the email is valid
    const userEmail = event.target["email"].value;

    if (userEmail === "" || userEmail.indexOf("@") === -1) {
      setMessage("Please specifiy your email");
      return;
    }
    const district = event.target["district"].value;

    db.collection("requests")
      .add({
        userEmail,
        district,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((docRef) => {
        setMessage("You will be notified soon");
      })
      .catch((error) => {
        console.log(error);
        setError("Data couldn't be uploaded");
      });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
      params: {
        language: "en_US"
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setInStates(response.data.states);
          setMessage("");
          setError("");
        } else {
          setInStates([]);
          setMessage("");
          setError("Data couldn't be retrieved from Govt. server");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("");
        setError("Data couldn't be retrieved from Govt. server");
      });
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedState}`,
      params: {
        language: "en_US"
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setDistricts(response.data.districts);
          setMessage("");
          setError("");
        } else {
          setDistricts([]);
          setMessage("");
          setError("Data couldn't be retrieved from Govt. server");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("");
        setError("Data couldn't be retrieved from Govt. server");
      });
  }, [selectedState]);

  useEffect(() => {
    const [month, date, year] = new Date()
      .toLocaleDateString("en-US")
      .split("/");
    const today = `${date}-${month}-${year}`;
    axios({
      method: "GET",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selectedDistrict}&date=${today}`,
      params: {
        language: "en_US"
      }
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.sessions.length > 0) {
            setMessage(
              `Vaccine slots are avilable for today in ${response.data.sessions.length} centers.`
            );
          } else {
            setMessage(
              "No vaccine slots are available for today. Click the notify button to get email."
            );
          }

          setError("");
        } else {
          setDistricts([]);
          setMessage("");
          setError("Data couldn't be retrieved from Govt. server");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("");
        setError("Data couldn't be retrieved from Govt. server");
      });
  }, [selectedDistrict]);

  return (
    <div className="Dashboard">
      <Header />
      <main>
        <form onSubmit={handleFormSubmit}>
          <div className="Dashboard-User-Container">
            <div className="Dashboard-Field-Container">
              <label>
                <h4>Your email to get notified for vaccine slots?</h4>
                <div className="Dashboard-Field">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleEmailInput}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="Dashboard-Hero">
            <div className="Dashboard-Field-Container">
              <label>
                <h4>Select the state where you reside?</h4>
                <div className="Dashboard-Field">
                  <select
                    name="inState"
                    value={selectedState}
                    onChange={handleInStateSelection}
                  >
                    {inStates &&
                      inStates.map((item, index) => {
                        return (
                          <option key={item.state_id} value={item.state_id}>
                            {item.state_name}
                          </option>
                        );
                      })}
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
                  <select
                    name="district"
                    value={selectedDistrict}
                    onChange={handleDistrictSelection}
                  >
                    {districts &&
                      districts.map((item, index) => {
                        return (
                          <option
                            key={item.district_id}
                            value={item.district_id}
                          >
                            {item.district_name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </label>
            </div>
            {/* <div className="Dashboard-Field-Container">
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
            </div> */}
            <input
              type="submit"
              value="NOTIFY ME IN EMAIL"
              className="Dashboard-Notify-Button Btn"
            ></input>
          </div>
        </form>
      </main>
      <div className="Dashboard-Status-Container">
        <h2 className="Dashboard-Status-Header">Status</h2>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
