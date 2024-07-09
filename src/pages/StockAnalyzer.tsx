import React, { useState } from "react";

import StockChart from "../components/StockChart";
import StockPricePicker from "../components/StockPricePicker";
import StockSelector from "../components/StockSelector";
import { PriceTypes, StockDataRecord } from "../types/common_types";

import "./StockAnalyzer.css";

const StockAnalyzer: React.FC = () => {
  const [selectedPriceType, setSelectedPriceType] =
    useState<PriceTypes>("Close");
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [stockData, setStockData] = useState<StockDataRecord>({});

  const handlePriceTypeSelect = (type: PriceTypes) => {
    setSelectedPriceType(type);
  };

  return (
    <div className="stock-analyzer">
      <h1>Stock Analyzer Chart</h1>
      <StockSelector
        selectedStocks={selectedStocks}
        onStockChange={setSelectedStocks}
      />
      <div className="stock-price-type-picker">
        <StockPricePicker
          selectedPriceType={selectedPriceType}
          handlePriceTypeSelect={handlePriceTypeSelect}
        />
      </div>
      <div className="stock-chart">
        <StockChart
          stockData={stockData}
          selectedPriceType={selectedPriceType}
        />
      </div>
    </div>
  );
};

export default StockAnalyzer;
