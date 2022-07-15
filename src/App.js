import logo from "./logo.svg";
import "./app.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/Pages/Home/Home";
import AddRider from "../src/Pages/AddRider/AddRider";
import AddCab from "../src/Pages/AddCab/AddCab";
import EditCab from "../src/Pages/EditCab/EditCab";
import Navbar from "./Components/Navbar/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addRider" element={<AddRider />} />
        <Route path="/addCab" element={<AddCab />} />
        <Route path="/editCab" element={<EditCab/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
