import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addcab.scss";
const AddCab = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const nameinputRef = useRef();
  const xinputRef = useRef();
  const yinputRef = useRef();
  // const activeRef = useRef();
  // const inactiveRef = useRef();

  let status;

  const setStatus = (e) => {
    status = e.target.value;
    console.log(status);
  };

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
      const data = await axios.post(
        `http://localhost:5000/car/`,
        {
          name: nameinputRef.current.value,
          x: xinputRef.current.value,
          y: yinputRef.current.value,
          status: status,
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
    <form className="cab-register-form" onSubmit={addCabHandler}>
      <h2>Create Cab</h2>

      <div className="item">
        <label>Username :</label>
        <input ref={nameinputRef} placeholder="username" />
      </div>
      <div className="item">
        <label>X :</label>
        <input ref={xinputRef} readOnly />
      </div>
      <div className="item">
        <label>Y :</label>
        <input ref={yinputRef} readOnly />
      </div>
      {/* //Radio buttons */}
      <div className="item" onChange={setStatus}>
        <h4>Status :</h4>
        <input
          type={"radio"}
          id="active"
          value={"active"}
          // ref={activeRef}
          name="status"
        />
        <label htmlFor="active">Active</label>
        <input
          type={"radio"}
          id="inactive"
          value={"inactive"}
          // ref={inactiveRef}
          name="status"
        />
        <label htmlFor="inactive">Inactive</label>
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

export default AddCab;
