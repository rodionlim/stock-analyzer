import React from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/stock-analyzer");
  };

  return (
    <div className="home">
      <h1>Welcome to Stock Analyzer</h1>
      <p>Helping fund managers gain further insights into companies</p>
      <button className="cta-button" onClick={handleClick}>
        Get Started
      </button>
    </div>
  );
};

export default Home;
