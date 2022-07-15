import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./bookedcab.scss";
const BookedCab = (props) => {
  const [loading, setLoading] = useState(false);

  let x;
  let y;
  useEffect(() => {
    x = Math.floor(Math.random() * 50);
    y = Math.floor(Math.random() * 50);
  }, []);

  const updateCabData = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const sentdata = await axios.put(
        `http://localhost:5000/car/status/${props.cab.ID}`,
        {
          x: x,
          y: y,
          status: "active",
          booked: false,
        },
        config
      );
      console.log(sentdata);
      // navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserData = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(props.rider._id);
    try {
      const data = axios.put(
        `http://localhost:5000/rider/${props.rider._id}`,
        {
          x: x,
          y: y,
          booked: false,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBtnHandler = async (e) => {
    e.preventDefault();
    await updateCabData();
    await updateUserData();
    props.closeThisTrip();
  };

  return (
    <div className="booked">
      <p>
        "{props.rider?.name}" successfully booked "{props.cab?.name}" Cab{" "}
      </p>
      <button onClick={cancelBtnHandler}> End trip</button>
    </div>
  );
};

export default BookedCab;
