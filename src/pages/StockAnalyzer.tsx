import React, { useState } from "react";

import "./StockAnalyzer.css";
import StockSelector from "../components/StockSelector";

const StockAnalyzer: React.FC = () => {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  return (
    <div className="stock-analyzer">
      <h1>Stock Analyzer Chart</h1>
      <StockSelector
        selectedStocks={selectedStocks}
        onStockChange={setSelectedStocks}
      />
    </div>
  );
};

export default StockAnalyzer;
