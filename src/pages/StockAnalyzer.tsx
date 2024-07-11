import React, { useState } from "react";

import StockChart from "../components/StockChart";
import StockPricePicker from "../components/StockPricePicker";
import StockSelector from "../components/StockSelector";
import { PriceTypes } from "../types/common_types";

import "./StockAnalyzer.css";
import useFetchStocksData from "../hooks/useFetchStocksData";

const StockAnalyzer: React.FC = () => {
  const [selectedPriceType, setSelectedPriceType] =
    useState<PriceTypes>("Close"); // user selects type of price to chart, OHLC
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]); // user selects stocks they want to chart

  const stocksData = useFetchStocksData(selectedStocks);

  return (
    <div className="stock-analyzer">
      <h1>Stock Analyzer Chart</h1>
      <StockSelector
        selectedStocks={selectedStocks}
        setSelectedStocks={setSelectedStocks}
      />
      <div className="stock-price-type-picker">
        <StockPricePicker
          selectedPriceType={selectedPriceType}
          setSelectedPriceType={setSelectedPriceType}
        />
      </div>
      <div className="stock-chart">
        <StockChart
          stocksData={stocksData}
          selectedPriceType={selectedPriceType}
        />
      </div>
    </div>
  );
};

export default StockAnalyzer;
