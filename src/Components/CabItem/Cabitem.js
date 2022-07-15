import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./cabitem.scss";

const Cabitem = (props) => {
  const navigate = useNavigate();
  const cabItemClickhandler = async (e) => {
    e.preventDefault();
    props.clicked(props.cab._id, props.cab.name);
  };
  const EditClickhandler = (e) => {
    e.preventDefault();

    navigate("/editCab", {
      replace: true,
      state: { data: props.cab },
    });
  };

  return (
    <div className="cabitem">
      <div className="detailsContainer">
        <label>Name :</label>
        <p>{props.cab?.name} </p>
      </div>

      <div className="buttonContainer">
        <button className="book" onClick={cabItemClickhandler}>
          Book Cab
        </button>
        <button className="edit" onClick={EditClickhandler}>
          Edit Cab
        </button>
      </div>
    </div>
  );
};

export default Cabitem;
