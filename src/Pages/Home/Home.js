import React, { useEffect, useRef, useState } from "react";
import Cabitem from "../../Components/CabItem/Cabitem";
import axios from "axios";
import "./home.scss";
import BookedCab from "../../Components/BookedCab/BookedCab";
import RandomUser from "../../Components/RandomUser/RandomUser";
const Home = () => {
  const [threshold, setthreshold] = useState(10);
  const [userdetails, setuserdetails] = useState();
  const [cabdata, setCabdata] = useState();
  const [finalcabdata, setFinalcabdata] = useState([]);
  const [bookedCarName, setbookedCarName] = useState();

  const [bookedData, setBookeddata] = useState();

  const loadData = async () => {
    const data = await axios.get("http://localhost:5000/car/");
    setCabdata(data.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const cabitemClickhander = async (ID, name) => {
    console.log(ID);
    if (finalcabdata.includes(ID)) {
      setbookedCarName({ ID: ID, name: name });
      await updateCabData(ID);
      await updateUserData();
    } else {
      alert("Too Far!!! Cab is not reachable to you");
    }
  };

  const getUserDetails = (data) => {
    setuserdetails(data);
    setbookedCarName(null);
    // console.log(data);
  };

  useEffect(() => {
    // TODO distance filter
    const Calcdistance = (x, y, rx, ry) => {
      let a = (rx - x) ** 2;
      let b = (ry - y) ** 2;
      let value = Math.sqrt(a - b);

      return value ? value : 0;
    };

    const finaldata = cabdata?.map((item) => {
      console.log(item.x, item.y, userdetails.x, userdetails.y);
      if (
        Calcdistance(item.x, item.y, userdetails.x, userdetails.y) < threshold
      )
        return item._id;
      else return;
    });
    console.log(finaldata);
    setFinalcabdata(finaldata);
  }, [userdetails, threshold, cabdata]);

  const updatethreshold = (e) => {
    e.preventDefault();
    setthreshold(e.target.value);
  };

  const updateCabData = async (ID) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const sentdata = await axios.put(
        `http://localhost:5000/car/status/${ID}`,
        {
          status: "active",
          booked: true,
        },
        config
      );
      console.log(sentdata);
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
    try {
      const data = axios.put(
        `http://localhost:5000/rider/${userdetails._id}`,
        {
          booked: true,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const closeThisTrip = () => {
    setbookedCarName(false);
  };

  return (
    <div className="home">
      <div className="top">
        <h1>Book a Cab</h1>
        <div className="topitem">
          <label htmlFor="threshold">Threshold</label>
          <input
            id="threshold"
            type="number"
            placeholder="threshold"
            defaultValue={threshold}
            onChange={updatethreshold}
          />
        </div>
      </div>
      <div className="content">
        <RandomUser className="randomitem" clicked={getUserDetails} />
        {cabdata && (
          <div className="cabitems">
            {cabdata.map((item, i) => (
              <Cabitem
                key={i}
                cab={item}
                clicked={cabitemClickhander}
                rider={userdetails}
              />
            ))}
          </div>
        )}
        {/* booking is the id of cab */}
        <div className="bookeditems">
          {bookedCarName && (
            <BookedCab
              cab={bookedCarName}
              rider={userdetails}
              closeThisTrip={closeThisTrip}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
