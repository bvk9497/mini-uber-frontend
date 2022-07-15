import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditCab = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const nameinputRef = useRef();
  const xinputRef = useRef();
  const yinputRef = useRef();
  const activeRef = useRef();
  const inactiveRef = useRef();

  useEffect(() => {
    xinputRef.current.value = Math.floor(Math.random() * 50);
    yinputRef.current.value = Math.floor(Math.random() * 50);
    nameinputRef.current.value = state.data.name
    if (state.data.status === "active") {
      activeRef.current.checked = true;
    }
    if (state.data.status === "inactive") {
      inactiveRef.current.checked = true;
    }
  }, []);

  let status;

  const setStatus = (e) => {
    status = e.target.value;
    console.log(status);
  };

  const updateData = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const sentdata = await axios.put(
        `http://localhost:5000/car/status/${state.data._id}`,
        {
          name: nameinputRef.current.value,
          x: xinputRef.current.value,
          y: yinputRef.current.value,
          status: status,
          booked: false,
        },
        config
      );
      console.log(sentdata);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const addCabHandler = async (e) => {
    e.preventDefault();
    updateData();
  };

  return (
    <form className="cab-register-form" onSubmit={addCabHandler}>
      <h2>Edit Cab</h2>

      <div className="item">
        <label>Username :</label>
        <input ref={nameinputRef} placeholder="name" />
      </div>
      <div className="item">
        <label>X :</label>
        <input ref={xinputRef} placeholder="X Coordinate" />
      </div>
      <div className="item">
        <label>Y :</label>
        <input ref={yinputRef} placeholder="Y Coordinate" />
      </div>

      {/* //Radio buttons */}
      <div className="item" onChange={setStatus}>
        <h4>Status</h4>
        <input
          type={"radio"}
          id="active"
          value={"active"}
          ref={activeRef}
          name="status"
        />
        <label htmlFor="active">Active</label>
        <input
          type={"radio"}
          id="inactive"
          value={"inactive"}
          ref={inactiveRef}
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

export default EditCab;
