import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import StockAnalyzer from "./components/StockAnalyzer";

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
      </div>
    </Router>
  );
};

export default App;
