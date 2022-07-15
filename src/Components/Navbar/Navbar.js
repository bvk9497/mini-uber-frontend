import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="homelink" to="/" replace>
        Uber
      </Link>
      <div className="right">
        <Link className="item" to="/addRider" replace>
          Add Rider
        </Link>
        <Link className="item" to="/addCab" replace>
          Add Cab
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
