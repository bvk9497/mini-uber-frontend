import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./addrider.scss";
import { useNavigate } from "react-router-dom";

const AddRider = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const nameinputRef = useRef();
  const xinputRef = useRef();
  const yinputRef = useRef();

  useEffect(() => {
    xinputRef.current.value = Math.floor(Math.random() * 50);
    yinputRef.current.value = Math.floor(Math.random() * 50);
  }, []);

  const postData = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const data = axios.post(
        `http://localhost:5000/rider/`,
        {
          name: nameinputRef.current.value,
          x: xinputRef.current.value,
          y: yinputRef.current.value,
          booked: false,
        },
        config
      );
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const addCabHandler = async (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <form className="rider-register-form" onSubmit={addCabHandler}>
      <h2>Create Rider</h2>

      <div className="item">
        <label>Username :</label>
        <input ref={nameinputRef} placeholder="username" />
      </div>
      <div className="item">
        <label>X :</label>
        <input ref={xinputRef} placeholder="X Coordinate" />
      </div>
      <div className="item">
        <label>Y :</label>
        <input ref={yinputRef} placeholder="Y Coordinate" />
      </div>
      <div className="item">
        <label>booked :</label>
        <input value={false} readOnly />
      </div>
      <div className="item">
        <button type="submit">{loading ? "sending data" : "Save"}</button>
      </div>
    </form>
  );
};
export default AddRider;
