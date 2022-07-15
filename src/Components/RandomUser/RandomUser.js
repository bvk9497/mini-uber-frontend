import axios from "axios";
import React, { useEffect, useState } from "react";
import "./randomuser.scss";
const RandomUser = (props) => {
  const [userData, setUserData] = useState([]);
  const [totalData, setTotaldata] = useState();

  const loadData = async () => {
    const data = await axios.get("http://localhost:5000/rider/allriders");
    setTotaldata(data.data);
    setUserData(data.data[Math.floor(Math.random() * data.data.length)]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getRandomUser = () => {
    // e.preventDefault();
    setUserData(totalData[Math.floor(Math.random() * totalData.length)]);
  };

  useEffect(() => {
    props.clicked(userData);
  }, [userData]);

  return (
    <div className={`randomitem ${props.className}`}>
      <h3>Current user</h3>
      <hr ></hr>
      <div className="detailsContainer">
        <div className="item">
          <label>Name :</label>
          <p>{userData?.name} </p>
        </div>
        <div className="item">
          <label>X :</label>
          <p>{userData?.x} </p>
        </div>
        <div className="item">
          <label>Y :</label>
          <p>{userData?.y} </p>
        </div>
        <div className="item">
          <label>booked :</label>
          <p>{userData?.booked ? "true" : "false"} </p>
        </div>
      </div>

      <div className="buttonContainer">
        <button onClick={getRandomUser}>Get random user</button>
      </div>
    </div>
  );
};
export default RandomUser;
