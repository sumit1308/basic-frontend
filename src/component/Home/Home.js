import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeComponent">
        <Link to="/">register</Link>
        <Link to="/addFund">addFund</Link>
    </div>
  );
};

export default Home;
