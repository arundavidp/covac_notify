import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

import Header from "./Header";

export default function Dashboard() {
  const [inStates, setInStates] = useState([]);
  const [selectedState, setSelectedState] = useState(1);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(1);
  const [error, setError] = useState("");

  const handleInStateSelection = (event) => {
    event.preventDefault();
    setSelectedState(event.target.value);
  };

  const handleDistrictSelection = (event) => {
    event.preventDefault();
    setSelectedDistrict(event.target.value);
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
          setError("Data couldn't be retrieved from Govt. server");
        } else {
          setInStates([]);
          setError();
        }
      })
      .catch((error) => {
        console.log(error);
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
          console.log(response.data.districts);
          setDistricts(response.data.districts);
          setError("Data couldn't be retrieved from Govt. server");
        } else {
          setDistricts([]);
          setError();
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Data couldn't be retrieved from Govt. server");
      });
  }, [selectedState]);

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
                  <select
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
