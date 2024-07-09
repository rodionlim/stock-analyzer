import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StockAnalyzer from "./pages/StockAnalyzer";

import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stock-analyzer" element={<StockAnalyzer />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
